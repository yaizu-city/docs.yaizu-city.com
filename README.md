焼津都市情報APIを使うと、焼津都市情報APIを活用することで、地図と位置情報を活用したウェブサイトやアプリケーションを作成することができます。


## 「焼津都市情報API」 について

「焼津都市情報API」 は、焼津市が公開する地図情報のAPI提供サービスです。

市民、民間企業、学術団体が営利目的、非営利目的を問わず無料で利用し、地図と位置情報を活用したウェブサイトやアプリケーションを作ることができます。  
焼津市では、焼津都市情報APIを活用し、「[スマートマップ焼津](https://maps.yaizu-smartcity.jp)」として、市民向けデジタル地図サービスの提供を行っています。

焼津都市情報APIで提供される情報は、国土地理院の「地理院地図」、焼津市が保有している位置情報データをオープンデータとして公開しているものです。

現在公開している情報は、都市計画や市の施設情報などで、かんたんな記述でみなさんのウェブサイトやアプリの地図上に表示できる他、APIでの取得もできます。

## クイックスタート

地図とデータを表示して、開発を始めましょう。

### 地図を表示する

**HTML**

```
<div id="map"></div>

<script type="text/javascript" src="https://city.geolonia.com/v1/shizuoka/yaizu/api.js"></script>
```

**CSS**

```
html, body, #map
{
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
```

**Javascript**

```
const myCity = new city.Yaizu.Map();
```

[Codepen で確認する](https://codepen.io/geolonia/pen/bNGOagR)

### 焼津市のデータを表示する

焼津市が[スマートマップ焼津](https://maps.yaizu-smartcity.jp/)公開しているデータを、地図上に表示できます。

**都市計画情報を表示する**

`loadData` メソッドを使って、地図上に[スマートマップ焼津](https://maps.yaizu-smartcity.jp/)で公開されているポリゴンデータを表示できます。

```
const myCity = new city.Yaizu.Map();

myCity.on('load', () => {  
  
  myCity.loadData('防災/内水浸水想定区域(公共下水道区域内)');
    
})
```

* 第一引数には、スマートマップ焼津に表示されているデータの `id` 文字列を入れてください。

**施設情報を表示する**

地図上に[スマートマップ焼津](https://maps.yaizu-smartcity.jp/)で公開されているポイントデータを表示できます。

まずは、[焼津市オープンデータ一覧](https://github.com/yaizu-city/opendata#yaizu-open-data) から表示したいデータを選びます。この例では、 `AED設置箇所一覧` を使います。

データ名列が「AED設置箇所一覧」の行、「GeoJSON」のリンク先をコピーします。

```
const myCity = new city.Yaizu.Map();

myCity.on('load', () => {
  // まず、GeoJSONデータを読み込みます。
  fetch("https://opendata.yaizu-fact.com/aed_location/data.geojson")
    .then((data) => data.json())
    .then((data) => {
      // GeoJSONのデータを地図に追加します。
      myCity.addSource('aed_location', {
        type: 'geojson',
        data: data,
      });

      // 次は、GeoJSONデータを表示させるための地図レイヤーを追加します。
      myCity.addLayer({
        id: 'aed_location_points',
        source: 'aed_location', // ←こちらは addSource の第一引数 'aed_location' と紐づけるための値です
        type: "circle",
        paint: {
          'circle-radius': 7,
          'circle-color': 'white',
          'circle-opacity': .8,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'gray',
          'circle-stroke-opacity': 1,
        },
      });
    });
});
```

スタイルの設定は、 `addLayer` の `paint` 設定を使います。詳しくは、 [MapLibre GL JS のドキュメンテーション](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle) を確認してください。


### 焼津都市情報APIのデータを取得する

以下のように地図上に表示している地物（ポリゴンや点）のデータを取得できます。

```
const myCity = new city.Yaizu.Map();

myCity.on("load", () => {
  myCity.loadData("ごみ・リサイクル/リサイクル拠点");

  myCity.on("click", (e) => {
    const features = myCity.queryRenderedFeatures(e.point, {
      layers: ["ごみ・リサイクル/リサイクル拠点"]
    });
    console.log(features.map(feature => feature.properties));
  });
});
```

![codepen sample program](./assets/img/codepen.png)
[Codepen で触ってみる](https://codepen.io/geolonia/pen/bNGOagR)

### 対応データ

- スマートマップ焼津のメニューの ［焼津市データ］セクション内のデータが表示できます。
- 背景地図は、スマートマップ焼津の［デフォルト］背景のみ使用できます。
![image](./assets/img/use-data-list.jpg)


## カスタマイズする

スマートマップ焼津は、Maplibre, Geolonia Maps と互換性があります。詳しいカスタマイズの方法は、[Intro - MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/API/) を参照してください。

## 独自ドメインでホスティングする

スマートマップ焼津を、独自ドメインでホスティングする場合は[焼津市](https://logoform.jp/form/tWbQ/206951)にお問い合わせください。

お問い合わせの際には、利用するドメイン名を伝えてください。その後 API キーを発行します。
API キーを使用して以下のようにスクリプトを読み込むことができます。

`https://city.geolonia.com/v1/shizuoka/yaizu/api.js?api-key=<APIキー>`


### 開発環境での利用

スマートマップ焼津は以下のドメインでは、APIキーの指定なしで利用できます。

* `http://127.0.0.1:*`
* `http://localhost:*`
* `https://*.test` (`http` も対応、全てのポート番号対応)
* `https://*.example` (`http` も対応、全てのポート番号対応)
* GitHub Pages（`https://*.github.io`） ※ 独自ドメインは対象外。
* Netlify (`https://*.netlify.com`, `https://*.netlify.app`) ※ 独自ドメインは対象外。
* Vercel (`https://*.vercel.app`) ※ 独自ドメインは対象外。
* [CodePen](https://codepen.io/)
* [JSFiddle](https://jsfiddle.net/)
* [CodeSandbox](https://codesandbox.io/)
* [PLAYCODE](https://playcode.io)
* [Web Maker](https://webmaker.app)

* URL は、スキーマも含めて一致する必要があります。たとえば、`http://127.0.0.1:8000` では利用可能ですが、 `https://127.0.0.1:8000` ではスキーマが違う (`http` と `https`) ため利用できません。

## ご利用にあたって
「[スマートマップ焼津利用規約](https://yaizu-smartcity.jp/smartmaps_kiyaku.pdf)」に同意の上、ご利用ください。
