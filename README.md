# アプリケーション名
ライコンアプリ(フロントエンド)  
ライコンアプリ（バックエンド）は  
https://github.com/masato-kobayashi5427/licon

## アプリケーション概要
他の人が持ってない経験を教え合うアプリ
特技や趣味、日常生活の経験を伝え合うことができる。

## URL
https://licon.vercel.app/

# 利用方法
## エピソード概要の投稿
1. ユーザーが紹介できる経験を投稿することができます。
2. その経験について知りたいと思ったユーザーがエピソードを購入し、ルームを作成することができます。
3. ルーム内ではチャット方式で画像を送ったり、経験を伝えることができます。  
4. 絵を書いてリアルタイムで投稿し、より具体的に説明ができます。
※実装予定 
5. ボードゲームのように物を置いて、説明がより具体的になります。

## アプリケーションを作成した背景
これまで、色々な人と出会う中で、他の人にはない特別な特技や趣味または経験を持っているのに、誰にも知られていないという人がたくさんいることを体験しました。
その特技を誰にも共有されないままなのは勿体無いと思い、それを共有できるようなアプリがあればいいなと思い開発を始めました。

## 洗い出した要件
https://docs.google.com/spreadsheets/d/1rabr16-bgK7vZ6-YudWLpLYL5dNApkQrfndLFhaQAD8/edit#gid=982722306

## 実装予定の機能
絵を書いてリアルタイムで共有する機能
ボードゲームのように物を置いて、状況をよりリアルに説明できる機能

## データベース設計
[![Image from Gyazo](https://i.gyazo.com/16c07d8a82f570ca716e5dec9615c490.png)](https://gyazo.com/16c07d8a82f570ca716e5dec9615c490)

## 画面遷移図
[![Image from Gyazo](https://i.gyazo.com/319c330504253a55cfcc1ed1b15e8e0d.png)](https://gyazo.com/319c330504253a55cfcc1ed1b15e8e0d)

## 開発環境
・フロントエンド：react-rails
・バックエンド：Ruby on rails
・インフラ
・テキストエディタ：VisualStaduoCode

## 工夫したポイント
フロントエンドをreact+typescript
バックエンドをrails API
で作成しました。
reactを選んだ理由は画面遷移が非常に早く、
検索などのユーザーの操作にも高速で結果を返してくれるところです。
