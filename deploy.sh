#!/usr/bin/env sh

set -e

npm run build

cd ./public

git init

git config --local user.name sparklinm
git config --local user.email l343998644@163.com

git add -A
git commit -m 'deploy'



git push -f git@github.com:sparklinm/vuepress-blog.git master:gh-pages

cd -