cabal build && cabal run site rebuild
cd _site
tidy -utf8 -imq -w 170 --tidy-mark no index.html
