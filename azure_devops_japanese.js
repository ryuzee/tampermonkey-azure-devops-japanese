// ==UserScript==
// @name         Azure DevOps Japanese Text Translation
// @namespace    https://www.ryuzee.com/
// @version      0.0.2
// @description  Replace major English words into Japanese
// @author       Ryuzee
// @match        https://dev.azure.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // オブザーバインスタンスを作成
  var observer = new MutationObserver(function(mutations, observer) {
    mutations.forEach(function(mutation){
      var keys = [
        "button.btn-cta",
        //"button.ms-CommandBarItem-link",
        "div.body-l",
        "div.ms-Button-label",
        "div.ms-TooltipHost span",
        "div.upsell-title",
        "div.title-m",
        "label.ms-Label",
        "span.bolt-button-text",
        "span.commandbar-item-text",
        "span.ms-CommandBarItem-commandText",
        "span.ms-Pivot-text",
        "span.ms-ContextualMenu-itemText",
        "span.ms-Dropdown-optionText",
        "span.ms-Dropdown-title",
        "span.new-feed-text",
        "span.queries-favorite-list-header-name",
        "span.text",
        "span.ui-button-text",
        "span.vss-PickList--selectableElementButton-text",
      ];
      var elms = [];
      for(var i=0; i < keys.length; i++){
        elms.push(mutation.target.querySelectorAll(keys[i]));
      }
      wholeDOMReplace(elms);
    });
  });

  observer.observe(document, {
    subtree: true,
    attributes: true
  });

  var wholeDOMReplace = function(elms) {
    for(var i=0; i<elms.length; i++) {
      var elm = elms[i];
      for(var j = 0, l = elm.length; j < l; j++) {
        var el = elm[j];
        replaceWords(el);
      }
    }
  };

  var replaceWords = function(elm) {
    var rep = [
      /** 長いので先にやる **/
      ["All dashoboards", "全てのダッシュボード"],
      ["Back to Work Items", "作業項目に戻る"],
      ["My favorite dashboards", "お気に入りのダッシュボード"],
      ["Product Backlog Item", "プロダクトバックログアイテム"],
      ["Prouct Backlog", "プロダクトバックログ"],
      ["View as Backlog", "バックログ形式で見る"],
      ["Recently created", "最近作成した項目"],
      ["Recently Completed", "最近完了した項目"],
      ["Recently updated", "最近更新した項目"],
      ["Upload File\\(s\\)", "ファイルのアップロード"],
      /** アルファベット順 **/
      ["Abandoned", "破棄済"],
      ["About this project", "このプロジェクトについて"],
      ["Active", "アクティブ"],
      ["Add project description", "プロジェクトの説明を追加"],
      ["Add to top", "先頭に追加"],
      ["Add a deployment group", "デプロイグループの追加"],
      ["Add at selection", "選択した位置に追加"],
      ["Add to bottom", "末尾に追加"],
      ["All Parameter Sets", "全てのパラメーターセット"],
      ["All Releases", "全てのリリース"],
      ["Assigned To me", "自分にアサイン"],
      ["Assigned To", "アサイン"],
      ["Analytics", "分析"],
      ["Area Path", "エリアパス"],
      ["Area", "エリア"],
      ["Artifacts", "作成物"],
      ["Available pools", "利用可能なプール"],
      ["Backlogs", "バックログ"],
      ["Backlog items", "バックログ項目"],
      ["Backlog items", "バックログ項目"],
      ["Backlog", "バックログ"],
      ["Branch Name", "ブランチ名"],
      ["Branches", "ブランチ"],
      ["Builds", "ビルド"],
      ["Bug", "バグ"],
      ["Cancel", "キャンセル"],
      ["Capacity", "キャパシティ"],
      ["Capture", "キャプチャー"],
      ["Charts", "チャート"],
      ["Changed Date", "更新日"],
      ["Change type", "種類の変更"],
      ["Clone", "複製"],
      ["Collapse all", "全てを閉じる"],
      ["Column Options", "カラムオプション"],
      ["Comments", "コメント"],
      ["Comment", "コメント"],
      ["Commits", "コミット"],
      ["Commit", "コミット"],
      ["Completed", "完了"],
      ["Configurations", "設定"],
      ["Contents", "コンテンツ"],
      ["Copy query URL", "クエリーのURLをコピー"],
      ["Create a release", "リリースを作成"],
      ["Create copy of work item", "作業項目のコピーを作成"],
      ["Create Tag", "タグの作成"],
      ["Create query", "クエリーの作成"],
      ["Create Wiki", "Wikiの作成"],
      ["Currently deployed", "現在デプロイ済"],
      ["Customize", "カスタマイズ"],
      ["DashBoards", "ダッシュボード"],
      ["Dashboard", "ダッシュボード"],
      ["Description", "詳細"],
      ["Deployment group name", "デプロイグループ名"],
      ["Deployment groups", "デプロイグループ"],
      ["Download as Zip", "Zipでダウンロード"],
      ["Editor", "エディタ"],
      ["Edit", "編集"],
      ["Effort", "規模"],
      ["Email query", "クエリーをメール"],
      ["Email work item", "作業項目をメール"],
      ["Epics", "エピック"],
      ["Epic", "エピック"],
      ["Expand all", "全てを開く"],
      ["Features", "フィーチャー"],
      ["Feature", "フィーチャー"],
      ["Folder", "フォルダー"],
      ["Following", "フォローしている項目"],
      ["History", "履歴"],
      ["Impediments", "妨害事項"],
      ["Impediment", "妨害事項"],
      ["Import a task group", "タスクグループのインポート"],
      ["Import release pipeline", "リリースパイプラインのインポート"],
      ["Import a pipeline", "パイプラインのインポート"],
      ["Import", "インポート"],
      ["Invite", "招待"],
      ["Iteration Path", "イテレーションパス"],
      ["Iteration", "イテレーション"],
      ["Keyboard shortcuts", "キーボードショートカット"],
      ["Last modified by", "最終更新日"],
      ["Last 1 day", "過去1日"],
      ["Last 7 days", "過去7日"],
      ["Last 30 days", "過去30日"],
      ["Leave", "移動"],
      ["Library", "ライブラリ"],
      ["Load test", "ロードテスト"],
      ["Members", "メンバー"],
      ["Mentioned", "メンションされた項目"],
      ["Mine", "自分"],
      ["Move to team project", "チームプロジェクトに移動"],
      ["My activity", "自動のアクティビティ"],
      ["My favorites", "自分のお気に入り"],
      ["My Favorites", "自分のお気に入り"],
      ["New branch", "新規ブランチ"],
      ["New File Name", "新規ファイル名"],
      ["New Folder Name", "新規フォルダ名"],
      ["New item", "新規項目"],
      ["New Work Item", "新しい作業項目"],
      ["New Sprint", "新しいスプリント"],
      ["New query", "新しいクエリー"],
      ["New feed", "新規フィード"],
      ["New pull request", "新規プルリクエスト"],
      ["New build pipeline", "新規ビルドパイプライン"],
      ["New linked work item", "関連する作業項目を作成"],
      ["New release pipeline", "新規リリースパイプライン"],
      ["New Test Plan", "新規テスト計画"],
      ["Open in Queries", "クエリーで開く"],
      ["Order", "順番"],
      ["Overview", "概要"],
      ["Parameters", "パラメーター"],
      ["Permanently delete", "完全に削除"],
      ["Project settings", "プロジェクト設定"],
      ["Project stats", "プロジェクトの状況"],
      ["Pipelines", "パイプライン"],
      ["Pull requests", "プルリクエスト"],
      ["Publish code as wiki", "コードをWikiページにする"],
      ["Pushes", "プッシュ"],
      ["Queries", "クエリー"],
      ["Queue", "キュー"],
      ["Repos", "レポジトリ"],
      ["Recycle Bin", "ゴミ箱"],
      ["Releases", "リリース"],
      ["Results", "結果"],
      ["Revert changes", "変更を元に戻す"],
      ["Runs", "実行結果"],
      ["Run query", "クエリーの実行"],
      ["Save items", "項目を保存"],
      ["Save query", "クエリーの保存"],
      ["Secure files", "セキュアファイル"],
      ["Security", "セキュリティ"],
      ["Sprints", "スプリント"],
      ["Start storyboarding", "ストーリーボードを作る"],
      ["States", "状態"],
      ["State", "状態"],
      ["Stay", "続行"],
      ["Summary", "サマリー"],
      ["Taskboard", "タスクボード"],
      ["Task Groups", "タスクグループ"],
      ["Templates", "テンプレート"],
      ["Test Plans", "テスト計画"],
      ["Tags", "タグ"],
      ["Task groups", "タスクグループ"],
      ["Title", "タイトル"],
      ["Types", "種別"],
      ["View as board", "ボードで見る"],
      ["View as backlog", "バックログで見る"],
      ["Work Items to link", "リンクする作業項目"],
      ["Work Items", "作業項目"],
      ["Work Item Type", "作業種別"],
      ["Value Area", "価値領域"],
      ["Variable Groups", "変数グループ"],
      ["Variable group name", "変数グループ名"],
      ["Variable group", "変数グループ"],
      /** 汎用 **/
      ["Add", "追加"],
      ["All", "全て"],
      ["Boards", "ボード"],
      ["Create", "作成"],
      //["Delete", "削除"],
      //["Files", "ファイル"],
      //["File", "ファイル"],
      ["Groups", "グループ"],
      ["Name", "名前"],
      ["New", "新規"],
      ["Rename", "リネーム"],
      ["Save", "保存"],
    ];

    var source = elm.textContent;
    for(var i=0; i<rep.length; i++) {
      source = source.replace(new RegExp(rep[i][0], 'ig'), rep[i][1]);
    }
    elm.textContent = source;
  };
})();
