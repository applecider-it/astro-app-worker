# DB

## ユーザー

users

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| id | 名前 | INTEGER | Primary |
| email | メールアドレス | TEXT |  |
| name | 名前 | TEXT |  |
| password_hash | パスワード | TEXT |  |
| created_at | 作成日時 | DATETIME, CURRENT_TIMESTAMP |  |
| google_id | Google ID | VARCHAR(255) |  |
| auth_type | 認証タイプ | VARCHAR(50) | `email` (default) \| `google` |
