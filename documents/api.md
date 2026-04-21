# API


## コメント一覧

Method: GET

URI: /comments

## コメント登録

Method: POST

URI: /comments/store

Params:

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| author | 著者 | string |  |
| content | 内容 | string |  |


## ログイン

Method: POST

URI: /auth/login

Params:

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| email | メールアドレス | string |  |
| password | パスワード | string |  |

## ログアウト

Method: POST

URI: /auth/logout

## 認証ユーザー

Method: GET

URI: /auth/me