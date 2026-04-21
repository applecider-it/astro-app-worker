# API


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

## グーグル認証

Method: GET

URI: /google


## グーグル認証コールバック

Method: GET

URI: /google/callback


## ツイート一覧

Method: GET

URI: /tweet

## ツイート登録

Method: POST

URI: /tweet/store

Params:

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| content | 内容 | string |  |


## コメント一覧

Method: GET

URI: /comment

## コメント登録

Method: POST

URI: /comment/store

Params:

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| author | 著者 | string |  |
| content | 内容 | string |  |
