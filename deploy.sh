#!/usr/bin/env sh

# ȷ���ű��׳������Ĵ���
set -e

# ���ɾ�̬�ļ�
npm run build

# �������ɵ��ļ���
cd docs/.vuepress/dist

# ����Ƿ������Զ�������
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# ��������� https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# ��������� https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:sparklinm/myBlog.git master:gh-pages

cd -