# astro-app用のcloudflareワーカー

## API


### コメント一覧

GET

/comments

### コメント登録

POST

/comments/store

Params: author, content


### ログイン

POST

/auth/login

Params: email, password

### ログアウト

POST

/auth/logout

### 認証ユーザー

GET

/auth/me
