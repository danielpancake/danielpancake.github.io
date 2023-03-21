--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings   #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TupleSections       #-}

module Main (main) where

import           Control.Monad              ((>>=))
import           Data.List                  (sortBy)
import qualified Data.Map                   as M
import           Data.Maybe                 (fromMaybe)
import           Data.Ord                   (comparing)
import qualified GHC.IO.Encoding            as E
import           Hakyll
import           Hakyll.Web.Sass            (sassCompiler)
import           Text.Read                  (readMaybe)
--------------------------------------------------------------------------------


(.!!.) :: Pattern -> Pattern -> Pattern
a .!!. b = a .&&. complement b


main :: IO ()
main = do
  E.setLocaleEncoding E.utf8
  hakyll $ do

    -- Matching *.sass files, ignoring _*.sass
    match ("css/*.sass" .!!. "css/_*.sass") $ do
      route $ setExtension "css"
      compile (fmap compressCss <$> sassCompiler)

    match "css/*.css" $ do
      route   idRoute
      compile compressCssCompiler

    -- Copying website images and fonts
    match ("images/**" .||. "webfonts/**" ) $ do
      route   idRoute
      compile copyFileCompiler

    match "content/**" $ do
      compile pandocCompiler

    match ("sections/*" .||. "templates/*") $ do
      compile templateBodyCompiler

    match "index.html" $ do
      route idRoute
      compile $ do
        -- Getting all css and js
        css <- loadAll "css/*.css"
        js  <- loadAll "js/*.js"

        let cssCtx = listField "css" defaultContext (pure css)
        let jsCtx  = listField "js"  defaultContext (pure js)
        let ctx    = cssCtx <> jsCtx <> customDefaultContext

        getResourceString
          >>= applyAsTemplate ctx
          >>= loadAndApplyTemplate "templates/main.html" ctx
          >>= relativizeUrls

    where
      customDefaultContext = addSection <> defaultContext


addSection :: Context String
addSection = functionField "addSection" $ \args page -> do
  case args of
    []                -> fail "addSection: ERROR"
    path : key_values -> do
      -- Converting key_values (looks like ["key1", "val1", "key2", "val2"]) into a context
      pagectx <- fromMaybeOrFail "ERROR" $ listOfStringToContext key_values

      -- Finding section-id value among key_values
      let sectionId = fromMaybe "" $ lookup "section-id" $ listOfStringToMap key_values
      -- Generating context for each section according to section-id
      sectionctx :: Context String <- case sectionId of
        "about"     -> do
          -- Loading all skills and generate the context
          skills <- byRelevance =<< loadAll "content/skills/*"
          return (generateListsCtx skills "skills")

        "portfolio" -> do
          -- Loading all projects and generate the context
          projects <- byRelevance =<< loadAll "content/projects/*"
          return (generateListsCtx projects "projects")

        _           -> return defaultContext

      -- Generating the full context
      let ctx = pagectx <> sectionctx <> addSection

      -- Loading the template and the section itself
      let compiler = loadAndApplyTemplate (fromFilePath path) ctx page
                 >>= loadAndApplyTemplate "templates/section.html" ctx

      itemBody <$> compiler


generateListsCtx :: [Item String] -> String -> Context String
generateListsCtx list fieldName = mconcat
  [ listField fieldName defaultContext (pure list)
  , defaultContext
  ]


relevance :: MonadMetadata m => Item a -> m Int
relevance item = do
  relevance <- getMetadataField (itemIdentifier item) "relevance"
  return $ fromMaybe 0 (relevance >>= readMaybe)


byRelevance :: MonadMetadata m => [Item a] -> m [Item a]
byRelevance items = reverse <$> sortByM relevance items
  where
    sortByM :: (Monad m, Ord k) => (a -> m k) -> [a] -> m [a]
    sortByM f xs = fmap (map snd . sortBy (comparing fst)) (mapM (\x -> fmap (,x) (f x)) xs)


fromMaybeOrFail :: MonadFail m => String -> Maybe a -> m a
fromMaybeOrFail x = maybe (fail x) pure


listOfStringToContext :: [String] -> Maybe (Context String)
listOfStringToContext []        = Just mempty
listOfStringToContext [k]       = Nothing
listOfStringToContext (k:val:r) = do
  context <- listOfStringToContext r
  return (constField k val <> context)


listOfStringToMap :: [String] -> [(String, String)]
listOfStringToMap []        = []
listOfStringToMap [k]       = []
listOfStringToMap (k:val:r) = (k, val) : listOfStringToMap r


-- compressJsCompiler :: Compiler (Item String)
-- compressJsCompiler = do
--   let minifyJS = C.unpack . minify . C.pack . itemBody
--   s <- getResourceString
--   return $ itemSetBody (minifyJS s) s
