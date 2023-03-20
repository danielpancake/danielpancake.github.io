--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings   #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TupleSections       #-}

module Main (main) where

import           Control.Monad   ((>>=))
import           Data.List       (sortBy)
import qualified Data.Map        as M
import           Data.Maybe      (fromMaybe)
import           Data.Ord        (comparing)
import           Debug.Trace
import qualified GHC.IO.Encoding as E
import           Hakyll
import           Text.Read       (readMaybe)
--------------------------------------------------------------------------------

main :: IO ()
main = do
  E.setLocaleEncoding E.utf8
  hakyll $ do

    match "images/*" $ do
      route   idRoute
      compile copyFileCompiler

    match "projects/*" $ do
      compile pandocCompiler

    match "sections/*" $ do
      compile templateBodyCompiler

    match "templates/*" $ do
      compile templateBodyCompiler

    match "index.html" $ do
      route idRoute
      compile $ do
        getResourceString
          >>= applyAsTemplate customDefaultContext
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
        "about"     -> return defaultContext

        "portfolio" -> do
          -- Load all projects
          projects <- byRelevance =<< loadAll "projects/*"
          -- Generate the context for the projects
          return (generateProjectsCtx projects)

        _           -> return defaultContext

      -- Generating the full context
      let ctx = pagectx <> sectionctx <> addSection

      -- Loading the template and the section itself
      let compiler = loadAndApplyTemplate (fromFilePath path) ctx page
                 >>= loadAndApplyTemplate "templates/section.html" ctx

      itemBody <$> compiler


generateProjectsCtx :: [Item String] -> Context String
generateProjectsCtx projects = mconcat
  [ listField "projects" defaultContext (return projects)
  , defaultContext
  ]


relevance :: MonadMetadata m => Item a -> m Int
relevance item = do
  relevance <- getMetadataField (itemIdentifier item) "relevance"
  return $ fromMaybe 0 (relevance >>= readMaybe)


byRelevance :: MonadMetadata m => [Item a] -> m [Item a]
byRelevance = sortByM relevance
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
