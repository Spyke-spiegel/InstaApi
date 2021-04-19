<template>
  <div class="container">
    <h1 class="title">Account hashtag insight page</h1>

    <div class="listSort">
      <button v-on:click="sortOccurence">sort by occurence</button>
      <button v-on:click="sortComments">sort by comments</button>
      <button v-on:click="sortLike">sort by like</button>
      <button v-on:click="sortByAlphabet">sort by Name</button>
       <button v-on:click="sortSaved">sort by Saved</button>
      <button v-on:click="score">test Score</button>
    </div>

    <div class="grid">
      <ul v-for="(doc, index) in sortedData">
        <div class="card">
          <div class="statHash">
            <h1>#{{ doc.hash }}</h1>
            <div class="occu">Occurence : {{ doc.occurence }}</div>
            <div class="like">Total Likes : {{doc.totalLikes}}</div>
            <div class="totalcomments">
              Total Comments : {{ doc.totalComments }}
            </div>
            <div class="totalReach">Total Reach : {{ doc.totalReach }}</div>
            <div class="totallImpr">
              Total Imptressions : {{ doc.totalImpr }}
            </div>
            <div class="totalSaved">Total Saved : {{ doc.totalSaved }}</div>
          </div>
          <div class="categorie">
            <div>score</div>
            <div>like score</div>
            <div>comments score</div>
            <div>reach score</div>
            <div>impressions score</div>
            <div>Saved Score</div>
          </div>
          <div class="weighted">
            <div>/ </div>
            <div>{{doc.weightedlike}}</div>
            <div>{{doc.weightedComments}}</div>
            <div>{{doc.weightedReach}}</div>
            <div>{{doc.weightedImpression}}</div>
            <div>{{doc.weightedSaved}}</div>
          </div>
          <div class="lastPost">
           <div class="score">{{doc.score}}</div>
           <div>{{doc.calculLike}}</div>
           <div>{{doc.calculComments}}</div>
           <div>{{doc.calculreach}}</div>
           <div>{{doc.calculImpression}}</div>
           <div>{{doc.calculSaved}}</div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Modal from "../components/modalPost";
import { db } from "../config/firebaseInit";
import { storage } from "../config/firebaseInit";
import firebase from "firebase";
export default {
  name: "hashtag",
  components: {
    modal: Modal,
  },
  data() {
    return {
      access_token: "",
      uid: "",
      IgId: "",
      hashID: "",
      searchHash: "",
      user_id: "",
      hashcomputed: [],
      NUData: [
        {
            "like_count": 331,
            "comments_count": 6,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-17T19:00:54+0000",
                        "text": "Cool shot \ud83d\udd25",
                        "id": "17874149867302803"
                    },
                    {
                        "timestamp": "2021-04-16T22:59:43+0000",
                        "text": "\ud83d\udc4f\ud83d\udc4f",
                        "id": "17895038854998286"
                    },
                    {
                        "timestamp": "2021-04-16T18:33:33+0000",
                        "text": "The wireless charger has trouble with an iPhone 12 Pro Max \u0040nativeunion",
                        "id": "18220062190006710"
                    },
                    {
                        "timestamp": "2021-04-16T17:43:45+0000",
                        "text": "I \u2764\ufe0f\u2764\ufe0f\u2764\ufe0f my drop wireless classic leather in black & my brother his cognac one!!",
                        "id": "17842199411588900"
                    },
                    {
                        "timestamp": "2021-04-16T16:49:38+0000",
                        "text": "Very sleek \ud83d\udd25\ud83d\udd25",
                        "id": "17924319664531218"
                    },
                    {
                        "timestamp": "2021-04-16T16:49:10+0000",
                        "text": "#leathergoods #leatherproducts #leatherwirelesscharger #leathercase #leatherphonecase #classiclook #classiccharger #minimalistdesign #smartdesign #classicdesign #minimalist #dapperlife #minimalistcarry #applefan #appleaddict #wirelesscharging #nativeunion #techrefined #wirelesscharger #fathersdaygifts #giftsforhim #giftsfordad",
                        "id": "18107372725220526"
                    }
                ]
            },
            "timestamp": "2021-04-16T16:49:07+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/173506067_466107564604112_4096150845674518478_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=7zlrP8zI7JgAX_k4fQJ&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=255dde50be3f20548f405141ec106553&oe=60A1CB84",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNu-_QeJM6a\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10103
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17899515124847390\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10570
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17899515124847390\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 20
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17899515124847390\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17899515124847390"
        },
        {
            "like_count": 350,
            "comments_count": 6,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-18T05:01:35+0000",
                        "text": "Dope!!",
                        "id": "17897252977953297"
                    },
                    {
                        "timestamp": "2021-04-15T12:18:37+0000",
                        "text": "Cool \ud83d\udd25",
                        "id": "17928602068546285"
                    },
                    {
                        "timestamp": "2021-04-14T14:06:19+0000",
                        "text": "Looks amazing \ud83d\udd25\ud83d\udd25",
                        "id": "17881156229296350"
                    },
                    {
                        "timestamp": "2021-04-14T14:01:49+0000",
                        "text": "#leatherdetails #designdetails #everydayluxury #productdesign #nativeunion #techrefined #everydaycarry #whatsinmybag #dapperlifestyle #gentlemanstyle #dapperlife #gentlemanlifestyle #minimalist #minimalistdesign #minimalistcarry #leathercardholder #leathergoods #giftsforhim #presentinspo #handcrafted #premiumdesign #italianleathergoods",
                        "id": "17902575250889805"
                    }
                ]
            },
            "timestamp": "2021-04-14T14:01:46+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/173026007_298455628336617_2381612101701624174_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=RuHZ7TJhHCoAX8Zht0Z&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=f63a8bf84a7134596a4d62f8160d2363&oe=60A33A65",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNpiP6KL8Q7\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 11540
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17873920703288152\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 11698
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17873920703288152\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 33
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17873920703288152\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17873920703288152"
        },
        {
            "like_count": 355,
            "comments_count": 6,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-16T03:52:02+0000",
                        "text": "Are you bringing this back? Says sold out on the website \ud83d\ude22",
                        "id": "17842120991588885"
                    },
                    {
                        "timestamp": "2021-04-11T00:29:44+0000",
                        "text": "\u2764\ufe0fNice \ud83d\udc4d\ud83c\udffc",
                        "id": "17868574202489061"
                    },
                    {
                        "timestamp": "2021-04-10T17:08:14+0000",
                        "text": "So clean \ud83d\udd25",
                        "id": "18083791852253745"
                    },
                    {
                        "timestamp": "2021-04-10T16:49:09+0000",
                        "text": "#ugc #usergenerated #leathergoods #leathercraft #applewatch #applewatchstrap #leatherapplewatchstrap #appleaddict #applefan #nativeunion #techrefined #dapperlifestyle #dapperlife #gentlemenlife #gentlemenlifestyle #everydaywear #dailyaccessories #everydaycarry #whatsinmybag #applewatch6 #applewatch7 #applewatchse #minimaldesigns #sparkjoy #buyless #buylessbutbetter #dailycarry",
                        "id": "17915721451643172"
                    }
                ]
            },
            "timestamp": "2021-04-10T16:49:06+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/170523280_301423804712207_4969705066072581712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=PDOz4q4GmPwAX8UoIUL&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=deb7cfcd5ccd473653149b3fae85fa0c&oe=60A15E2F",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNfiN7CpCEr\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 12693
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17927001571557350\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 13571
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17927001571557350\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 23
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17927001571557350\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17927001571557350"
        },
        {
            "like_count": 288,
            "comments_count": 6,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-10T14:27:58+0000",
                        "text": "So slick \ud83d\udd25\ud83d\udd25\ud83d\udd25",
                        "id": "17880761237285008"
                    },
                    {
                        "timestamp": "2021-04-10T14:26:58+0000",
                        "text": "Check your dm",
                        "id": "17870069102473904"
                    },
                    {
                        "timestamp": "2021-04-07T15:57:53+0000",
                        "text": "\ud83d\ude0d\ud83d\ude0d\ud83d\ude0d these are my favorites things including cognac version!!! Hope my next item will be belt cable c to c in cosmos. My belt cable pro c to c in cosmos is lonely \ud83d\ude02",
                        "id": "17877294872210009"
                    },
                    {
                        "timestamp": "2021-04-07T14:01:13+0000",
                        "text": "#wirelesscharger #wirelesscharging #honestreview #mytoppicks #productdesign #leathergoods #leatherwirelesscharger #elevated #minimalist #minimalistdesign #minimalistliving #minimalistinterior #iphonecharger #airpodscharger #livesmarter #smartliving #dapperlife #gentlemenaccessories #gentlemencode #dapperlifestyle #nativeunion #techrefined  #dropwireless #interiorsetup #interiorinspo",
                        "id": "17886243548135618"
                    }
                ]
            },
            "timestamp": "2021-04-07T14:01:10+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/169393613_119666783528045_491572055309766901_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=F6h33f5RJdgAX_pOAkw&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=00aa114feeab17a7c879b275cbdf32fd&oe=60A2DAC0",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNXgnbSrKJW\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 9435
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "18102138871242895\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10211
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "18102138871242895\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 23
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "18102138871242895\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "18102138871242895"
        },
        {
            "like_count": 496,
            "comments_count": 4,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-10T17:47:05+0000",
                        "text": "\u2764\ufe0f\u2764\ufe0f",
                        "id": "17872299299367004"
                    },
                    {
                        "timestamp": "2021-04-10T17:06:30+0000",
                        "text": "Perfect \ud83d\ude0d\ud83d\ude0d\ud83d\ude0d",
                        "id": "17876718392216467"
                    },
                    {
                        "timestamp": "2021-04-04T16:49:09+0000",
                        "text": "#leather #leatherquality #nativeunion #techrefined #blueangelcertification #blueangel #trustedpartner #qualityleather #commitmenttoquality #leathercase #leatherairpodscase #leatherairpodsprocase #leatheriphonecase #minimalist #dapperlife #productdesign #dapperlifestyle #minimalistlifestyle #minimallifestyle #qualitydesign #attentiontodetail #consciousfashion #consciousdesign",
                        "id": "17891182076054392"
                    }
                ]
            },
            "timestamp": "2021-04-04T16:49:06+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/168540191_352139339540868_7167453728423855802_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=1ZdMg782VvYAX9GCgJu&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=53acd2e4d9ac13990795cc70049627d9&oe=60A4A0BB",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNQFcqjAe9-\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 16819
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17894917090971343\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17638
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17894917090971343\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 78
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17894917090971343\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17894917090971343"
        },
        {
            "like_count": 620,
            "comments_count": 10,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-02T18:35:31+0000",
                        "text": "\ud83d\udd25\ud83d\udd25",
                        "id": "17867980061415389"
                    },
                    {
                        "timestamp": "2021-04-02T17:54:33+0000",
                        "text": "Looks like a card holder wallet! You guys should definitely make one like that",
                        "id": "17858834972511083"
                    },
                    {
                        "timestamp": "2021-04-02T17:40:58+0000",
                        "text": "Giving me \"matte black everything\" vibes",
                        "id": "18216972502018024"
                    },
                    {
                        "timestamp": "2021-04-02T17:29:48+0000",
                        "text": "\ud83d\udc4f",
                        "id": "17867606603461362"
                    },
                    {
                        "timestamp": "2021-04-02T17:17:04+0000",
                        "text": "A Native Union MagSafe leather case would be real nice",
                        "id": "17891056550031101"
                    },
                    {
                        "timestamp": "2021-04-02T16:49:09+0000",
                        "text": "#leather #leatherquality #nativeunion #techrefined #blueangelcertification #blueangel #trustedpartner #qualityleather #commitmenttoquality #leathercase #leatherairpodscase #leatherairpodsprocase #leatheriphonecase #minimalist #dapperlife #productdesign #dapperlifestyle #minimalistlifestyle #minimallifestyle #qualitydesign #attentiontodetail #consciousfashion #consciousdesign",
                        "id": "18215243710000363"
                    }
                ]
            },
            "timestamp": "2021-04-02T16:49:06+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/168857321_3047646268891835_5363915275681558673_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Iw1rfdSAAPgAX_gPu2S&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=9063da3a794a948dff96cacc52a60ef2&oe=60A23B51",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNK73DcrSkl\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 22820
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17897990698918342\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 23270
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17897990698918342\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 39
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17897990698918342\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17897990698918342"
        },
        {
            "like_count": 265,
            "comments_count": 3,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-14T14:10:44+0000",
                        "text": "\ud83d\udd25\ud83d\udd25\ud83d\udd25",
                        "id": "17933011960482921"
                    },
                    {
                        "timestamp": "2021-03-30T14:01:11+0000",
                        "text": "#productdesign #luxdesign #airpodscase #airpodsprocase #leathercase #leathergoods #nativeunion #techrefined  #everydaycarry #whatsinmybag #airpodcase #airpodprocase #handcrafted #honestreview #minimaliststyle #backtobasics #presentsforhim #presentsforher #fashioninspo #playmymusic #musicislife",
                        "id": "17937443194485308"
                    }
                ]
            },
            "timestamp": "2021-03-30T14:01:08+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/166184402_436115730950507_6169932514784353813_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=iPkqrj7HgCAAX86wHvf&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=1e676a9503bee12fb6ff156958fc69f6&oe=60A2052D",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CNC6QQTsftW\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 9899
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17915259712652083\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10585
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17915259712652083\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 48
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17915259712652083\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17915259712652083"
        },
        {
            "like_count": 281,
            "comments_count": 1,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-27T16:49:15+0000",
                        "text": "#ugc #coffeetime #tlc #coffeehour #coffeeflatlay #applelifestyle #coffeelifestyle #workhardanywhere #appleandcoffee #everydaycoffee #iphone12 #iphone12pro #iphone12pro #iphone12promax #modernliving #organizeddesk #organizedliving #tablesetup #tableflatlay #plantdad #plantmomlifestyle #wirelesscharging #wirelesscharger #appleaddict #coffeeaddict #coffeeshoplifestyle #wfh #workfromhome #workfromhomesetup #wfhsetup",
                        "id": "17877282539254535"
                    }
                ]
            },
            "timestamp": "2021-03-27T16:49:06+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/165110273_467628294577510_4610582434318472144_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=p5FnBe9P-jMAX9F2-93&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=b25a0017e7e2e6046deed1e948da18d9&oe=60A105BF",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CM7fF0hrtff\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 11077
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17902843927837333\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 11487
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17902843927837333\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 12
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17902843927837333\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17902843927837333"
        },
        {
            "like_count": 390,
            "comments_count": 7,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-17T16:13:31+0000",
                        "text": "how much?",
                        "id": "17906136979839521"
                    },
                    {
                        "timestamp": "2021-04-07T02:45:28+0000",
                        "text": "Iphone 11",
                        "id": "17871739967360327"
                    },
                    {
                        "timestamp": "2021-04-04T07:51:41+0000",
                        "text": "iPhone 12 Pro Max \ud83d\ude4f\ud83c\udffb\ud83d\ude4f\ud83c\udffb\ud83d\ude4f\ud83c\udffb",
                        "id": "17884963655070533"
                    },
                    {
                        "timestamp": "2021-03-31T02:05:55+0000",
                        "text": "I need the one for iPhone 12 Pro max",
                        "id": "17849546603538010"
                    },
                    {
                        "timestamp": "2021-03-27T14:03:38+0000",
                        "text": "We need the one for 12 pro max!!",
                        "id": "17843256533563693"
                    },
                    {
                        "timestamp": "2021-03-24T14:36:09+0000",
                        "text": "Please bring it in iPhone 12 Pro Max \ud83d\ude22",
                        "id": "17973484177370829"
                    },
                    {
                        "timestamp": "2021-03-24T14:01:14+0000",
                        "text": "#nativeunion #techrefined #maisonkitsune #chillaxfox #maisonkitsunechillaxfox #maisonkitsunexnativeunion #nativeunionxmaisonkitsune #backagain #finallyrestocked #japaneseaethetic #japanesestyle #streetstyle #streetwear #streetstyleaccessories #cuteaccessories #streetaccessories #iphone12case #iphone12procase #iphone12minicase #kitsunestyle #chillax #streetwearstyle #streets #everydaycarry #whatsinmybag #latesttrend",
                        "id": "17895107422941985"
                    }
                ]
            },
            "timestamp": "2021-03-24T14:01:11+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/163599868_836232367102419_841641238104542620_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=My9c5HOm_IsAX_kje00&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=ad2e35b8f729c3f8f14c7cb78c1606f4&oe=60A3E0DE",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMzdfCBL_tG\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 16436
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17898645967838133\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17236
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17898645967838133\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 175
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17898645967838133\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17898645967838133"
        },
        {
            "like_count": 435,
            "comments_count": 4,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-24T09:29:14+0000",
                        "text": "beautiful\ud83d\ude0d\ud83d\ude0d",
                        "id": "17862970415497338"
                    },
                    {
                        "timestamp": "2021-03-23T16:09:48+0000",
                        "text": "Any plans to release Magsafe wireless chargers and stands soon?",
                        "id": "17965979542391859"
                    },
                    {
                        "timestamp": "2021-03-23T01:06:33+0000",
                        "text": "#wirelesscharger #wirelesscharging #techassessories #samsungcharger #pixelcharger #iphonecharger #airpodschager #samsunggalaxy #pixel #googlepixel #googlepixel2 #lifehack #interiordesign #techsetup #tablesetup #minimallifestyle #interiorinspo #whatsonmytable #nativeunion #techrefined #organizedliving #technology #modernlifestyle",
                        "id": "17889476513027291"
                    }
                ]
            },
            "timestamp": "2021-03-22T14:01:08+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/162720489_912597742861093_2225038973466767957_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=V3E6fhv4LbQAX8ZDIqH&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=994eaf3d69dde908cabf04e983fce4de&oe=60A483DA",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMuT5QtLdXO\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 16641
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17861641691423886\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17344
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17861641691423886\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 54
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17861641691423886\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17861641691423886"
        },
        {
            "like_count": 478,
            "comments_count": 14,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-09T12:00:18+0000",
                        "text": "Will you be making MagSafe versions of your cases? I know we can still technically charge with MagSafe, but the magnetic feature is too weak and can\u2019t use it on MagSafe stands\/ upright chargers (e.g. Belkin MagSafe dock)",
                        "id": "18166395661189443"
                    },
                    {
                        "timestamp": "2021-03-28T05:29:09+0000",
                        "text": "Love this so much \ud83d\ude0d my fav colour \u2764\ufe0f",
                        "id": "17862383192435369"
                    },
                    {
                        "timestamp": "2021-03-21T15:51:18+0000",
                        "text": "I just bought mine a few weeks ago and now I wish I had waited :\/",
                        "id": "17878548755209574"
                    },
                    {
                        "timestamp": "2021-03-20T13:29:55+0000",
                        "text": "Please start shipping to india!!!",
                        "id": "17882796731146018"
                    },
                    {
                        "timestamp": "2021-03-20T00:30:12+0000",
                        "text": "Get that color for iPhone 11 please !! \ud83d\udd25",
                        "id": "17912296933637401"
                    },
                    {
                        "timestamp": "2021-03-19T20:04:29+0000",
                        "text": "that\u2019s a nice color.",
                        "id": "18034413568288275"
                    },
                    {
                        "timestamp": "2021-03-19T15:00:45+0000",
                        "text": "got a Clic Canvas... am I going to buy another one for MagSafe? bro obvious answer.",
                        "id": "17889803861013409"
                    },
                    {
                        "timestamp": "2021-03-19T14:35:48+0000",
                        "text": "Yaaaaaaas can\u2019t wait! I\u2019ve wanted to get this case but wished it had MagSafe. \ud83d\ude4c",
                        "id": "17902559161818008"
                    },
                    {
                        "timestamp": "2021-03-19T14:35:45+0000",
                        "text": "That would be dope if the leather cases can get a MagSafe upgrade",
                        "id": "18165475357102807"
                    },
                    {
                        "timestamp": "2021-03-19T14:31:02+0000",
                        "text": "Please come to indoensian",
                        "id": "17878020506213291"
                    },
                    {
                        "timestamp": "2021-03-19T14:29:08+0000",
                        "text": "#iphone12 #iphone12pro #iphone12promax #magsafe #magsafecompatible #magsafecompatiblecase #techupgrade #teaser #comingsoon #nativeunion #techrefined #minimalist #minimaldesign #scandinaviandesign #edc #whatsinmybag #everydaycarry #fashioninspo #techaccessories #iphone12accessories #iphone12proaccessories #iphone12promaxaccessories #getready #getreadyforspring #springshopping #cliccanvas",
                        "id": "17864868851423263"
                    }
                ]
            },
            "timestamp": "2021-03-19T14:29:05+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/161744387_2919443211670349_3329206387316465754_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=hXm4kHPoGfgAX-a3DKq&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=93274978d6ae364dfb904e957bb1c9d4&oe=60A3317A",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMmotXeLb5p\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 16368
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17911253536655108\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17491
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17911253536655108\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 52
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17911253536655108\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17911253536655108"
        },
        {
            "like_count": 1251,
            "comments_count": 893,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-05T09:48:29+0000",
                        "text": "Irresistible charm",
                        "id": "17921384164588931"
                    },
                    {
                        "timestamp": "2021-03-26T11:57:38+0000",
                        "text": "\u0040cmhead97",
                        "id": "17900684095866899"
                    },
                    {
                        "timestamp": "2021-03-24T05:19:14+0000",
                        "text": "\u0040yapleeteng",
                        "id": "17953634755423195"
                    },
                    {
                        "timestamp": "2021-03-24T05:19:07+0000",
                        "text": "\u0040screviewsbeauty",
                        "id": "17930558527511987"
                    },
                    {
                        "timestamp": "2021-03-24T05:18:59+0000",
                        "text": "\u0040cheowder",
                        "id": "17881780676108660"
                    },
                    {
                        "timestamp": "2021-03-24T05:18:53+0000",
                        "text": "\u0040helloyoucancallmeshuijiao",
                        "id": "18209475052063667"
                    },
                    {
                        "timestamp": "2021-03-24T05:18:47+0000",
                        "text": "\u0040treeoflife.yap",
                        "id": "18145335274082994"
                    },
                    {
                        "timestamp": "2021-03-24T05:18:44+0000",
                        "text": "\u0040milestonelove",
                        "id": "17920122259581911"
                    },
                    {
                        "timestamp": "2021-03-24T03:51:02+0000",
                        "text": "\u0040x_rzmt_x \u2764\ufe0f",
                        "id": "17883429035138948"
                    },
                    {
                        "timestamp": "2021-03-24T03:50:44+0000",
                        "text": "\u0040scmeetsbbt \u2764\ufe0f",
                        "id": "17902689643840714"
                    },
                    {
                        "timestamp": "2021-03-24T03:50:37+0000",
                        "text": "\u0040chengzy \u2764\ufe0f",
                        "id": "17936281972482605"
                    },
                    {
                        "timestamp": "2021-03-24T03:50:05+0000",
                        "text": "\u0040sarscm96 \u2764\ufe0f",
                        "id": "17913384433653527"
                    },
                    {
                        "timestamp": "2021-03-24T03:49:56+0000",
                        "text": "\u0040charishii \u2764\ufe0f",
                        "id": "17906344615739160"
                    },
                    {
                        "timestamp": "2021-03-24T03:49:50+0000",
                        "text": "\u0040cheowingdownfud \u2764\ufe0f",
                        "id": "17877910013162894"
                    },
                    {
                        "timestamp": "2021-03-23T18:13:28+0000",
                        "text": "\u0040bbdaart",
                        "id": "17889494378030221"
                    },
                    {
                        "timestamp": "2021-03-23T18:12:58+0000",
                        "text": "\u0040graciela_herrera5",
                        "id": "17895769366927175"
                    },
                    {
                        "timestamp": "2021-03-23T18:12:39+0000",
                        "text": "\u0040moellermedia",
                        "id": "17898936127881311"
                    },
                    {
                        "timestamp": "2021-03-23T18:12:32+0000",
                        "text": "\u0040jamestwdm",
                        "id": "17881322519181927"
                    },
                    {
                        "timestamp": "2021-03-23T18:12:19+0000",
                        "text": "\u0040aaron.arellano34",
                        "id": "17957534287408884"
                    },
                    {
                        "timestamp": "2021-03-23T18:12:15+0000",
                        "text": "\u0040kiddo_christopher",
                        "id": "17874767690215981"
                    },
                    {
                        "timestamp": "2021-03-23T18:12:02+0000",
                        "text": "\u0040pancho_the_cat96",
                        "id": "17918863777605922"
                    },
                    {
                        "timestamp": "2021-03-23T18:11:39+0000",
                        "text": "\u0040kadonshelley",
                        "id": "17889913040052625"
                    },
                    {
                        "timestamp": "2021-03-23T15:43:58+0000",
                        "text": "Really want the wireless charger \ud83d\ude0d \u0040screviewsbeauty",
                        "id": "17886844619091257"
                    },
                    {
                        "timestamp": "2021-03-23T15:43:45+0000",
                        "text": "Really want the wireless charger \ud83d\ude0d \u0040pearlieee__",
                        "id": "18107340076210006"
                    },
                    {
                        "timestamp": "2021-03-23T15:43:35+0000",
                        "text": "Really want the wireless charger \ud83d\ude0d \u0040tinytingtong",
                        "id": "17895887089930083"
                    }
                ],
                "paging": {
                    "cursors": {
                        "after": "UVZAGRFdUZAzFVVlZARTkRSdWVGcGpMWEZAwV0dWMFpuWTFRVWswVWtabWNYZAGlRbnAxZAFUxTVZAsRkZAZAbVZANWDJ4VlpVSlJjSFoxV25ScGMwMUtjRnBvY0hab1pWWnpiVnAxVFUweWVrWndaVmd5WkRSQ2JHTTNaZAz09"
                    },
                    "next": "https:\/\/graph.facebook.com\/v10.0\/17870706434300483\/comments?access_token=EAAD4764ZBe5oBAJHVfDiBt529WWIYRuLCvN2c1ZCpZCq5k1nz5F1mImymmWNr57ZAf7Ru8JZAGZAZAMjehBjnP4aZAxGCr9BdrZBlpZAwhmr8B8csCTQOaZCgpP1ZBBQDPsZAfbuNZAx3PZBMKzUaTcZCXJ48jgZAeQcZAsLZC9397mRMFmrZAQHT4GhQpz1MY59&limit=25&after=UVZAGRFdUZAzFVVlZARTkRSdWVGcGpMWEZAwV0dWMFpuWTFRVWswVWtabWNYZAGlRbnAxZAFUxTVZAsRkZAZAbVZANWDJ4VlpVSlJjSFoxV25ScGMwMUtjRnBvY0hab1pWWnpiVnAxVFUweWVrWndaVmd5WkRSQ2JHTTNaZAz09"
                }
            },
            "timestamp": "2021-03-16T17:00:53+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.29350-15\/161718013_1642251435977804_367282989269833317_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=vhN9HKKfYnYAX_aoxJq&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=d248c792e6dea039209ea33dca19e954&oe=60A3E39A",
            "media_type": "CAROUSEL_ALBUM",
            "permalink": "https:\/\/www.instagram.com\/p\/CMfLsu_LuWr\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 27495
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17870706434300483\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 30736
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17870706434300483\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 281
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17870706434300483\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17870706434300483"
        },
        {
            "like_count": 221,
            "comments_count": 2,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-16T19:22:22+0000",
                        "text": "\ud83d\ude2e",
                        "id": "17917530775574770"
                    },
                    {
                        "timestamp": "2021-03-14T16:49:08+0000",
                        "text": "#everydaystyle #roamanywhere #airpodscase #airpodsprocase #airpodsprocasewithclip #airpodscasewithclip #onthegoessential #musicanywhere #playmymusic #nativeunion #techrefined #outdooraccessories #travelessentials #whatsinmybag #edc #everydaycarry #applefan #applecase #onthegomusthave #travelmusthave #travelfavorite",
                        "id": "17863786121486690"
                    }
                ]
            },
            "timestamp": "2021-03-14T16:49:06+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/160600521_147689717227327_3363717598160574108_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=jbX0nCmmgXUAX9GdHyn&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=cd40f3a1b575fb95255b1fea447f5032&oe=60A28205",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMaAwYNMG5y\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10532
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17910188215667010\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 11301
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17910188215667010\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 26
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17910188215667010\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17910188215667010"
        },
        {
            "like_count": 559,
            "comments_count": 5,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-15T22:20:52+0000",
                        "text": "Help! I already send you DM ! \u0040nativeunion",
                        "id": "17861109887497856"
                    },
                    {
                        "timestamp": "2021-03-12T19:17:47+0000",
                        "text": "Nice \ud83d\udd25",
                        "id": "17903204875770071"
                    },
                    {
                        "timestamp": "2021-03-12T18:01:01+0000",
                        "text": "\u2764\ufe0f",
                        "id": "17859780908502440"
                    },
                    {
                        "timestamp": "2021-03-12T16:13:16+0000",
                        "text": "How about a Stow Slim Sleeve for 12.9 iPad Pro in different colors?\nLike indigo... \u2639\ufe0f grey ist boring \ud83e\udd37\ud83c\udffb\u200d\u2642\ufe0f",
                        "id": "17900374813829115"
                    },
                    {
                        "timestamp": "2021-03-12T16:00:42+0000",
                        "text": "#usbc #typeccable #newcolor #appleaccessories #chargefaster #techaccessories #edc #everydayroutine #lifehack #lifetip #nativeunion #workfaster #workhardanywhere #homepod #homepodmini #ipad #ipadaccessories #iphoneaccessories #appleaddict #newcolors #newrelease #strongconnection #techupdate #newtech",
                        "id": "18076226605250052"
                    }
                ]
            },
            "timestamp": "2021-03-12T16:00:40+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/158979886_1007125693027048_4594271538307537031_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=sCuGPrk6-EgAX8qVeCL&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=c04f2cc88f48d1737fecfedd5930c230&oe=60A15EDA",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMUxn7RMkkW\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 16311
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "18143697319181205\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17738
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "18143697319181205\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 46
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "18143697319181205\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "18143697319181205"
        },
        {
            "like_count": 276,
            "comments_count": 2,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-13T11:50:48+0000",
                        "text": "Gorgeous \ud83d\ude0d",
                        "id": "17956480462407731"
                    },
                    {
                        "timestamp": "2021-03-11T15:02:09+0000",
                        "text": "#pov #lifesolutions #lifehacks #simplesolutions #makelifeeasier #nativeunion #techrefined #cable #nightstandessentials #tableaccessories #whatsonmytable #tableinspo #minimalistdesign #minimalistinterior #organizedliving #sparkjoy #applefan #appleaddict #pastelaccessories #lifehack #organizationsolution #propdesign",
                        "id": "17923398448553443"
                    }
                ]
            },
            "timestamp": "2021-03-11T15:02:04+0000",
            "media_url": "https:\/\/video-cdg2-1.cdninstagram.com\/v\/t50.2886-16\/160193563_188810103047184_1799615645808038473_n.mp4?_nc_cat=102&vs=17879315735109470_79091740&_nc_vs=HBkcFQAYJEdCdGNqQWtRUkItSHVLc0FBRW1TbnlUbGhQa1lia1lMQUFBRhUAAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJrz2l\u00252BWSycI\u00252FFQIoAkMzLBdAIDMzMzMzMxgSZGFzaF9iYXNlbGluZV8xX3YxEQB16gcA&ccb=1-3&_nc_sid=59939d&efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjcyMC5mZWVkIn0\u00253D&_nc_ohc=D7XXIvjpqCgAX9FNzZU&_nc_ht=video-cdg2-1.cdninstagram.com&oh=7e440fc31962881d802d798d19296d8a&oe=60A4C187&_nc_rid=86fd3cf4ac",
            "media_type": "VIDEO",
            "permalink": "https:\/\/www.instagram.com\/p\/CMSGCCEDyiC\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10751
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17893849639940401\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 11464
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17893849639940401\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 32
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17893849639940401\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17893849639940401"
        },
        {
            "like_count": 311,
            "comments_count": 1,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-08T15:01:32+0000",
                        "text": "#wirelesscharging #wirelesscharger #applelifestyle #techlifestyle #techflatlay #mensfashion #mensedc #myedc #blackflatlay #whatsonmytable #tableinspo #tablesetup #workhardeveryday #workhardanywhere #applefan #nativeunion #techrefined #ugc #modernlifestyle #basicisbest #minimalist #minimalsetup #minimal #appleandcoffee #coffeelifestyle",
                        "id": "17890894723970047"
                    }
                ]
            },
            "timestamp": "2021-03-08T15:01:28+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/157495922_1386779691655703_2702887543186475803_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=l5y4o6WwP2YAX8j2aBF&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=afdd203be643e18fa0536b7cd8656c4e&oe=60A3A51B",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMKXq14rwck\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 9175
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17888388172980907\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 10137
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17888388172980907\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 21
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17888388172980907\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17888388172980907"
        },
        {
            "like_count": 393,
            "comments_count": 11,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-07T02:56:02+0000",
                        "text": "Dat metallic escape key doe \ud83e\udd29",
                        "id": "18000011437313098"
                    },
                    {
                        "timestamp": "2021-03-06T14:47:37+0000",
                        "text": "Nice",
                        "id": "17937976735461086"
                    },
                    {
                        "timestamp": "2021-03-06T13:37:54+0000",
                        "text": "Nice! Where can i buy that cable?",
                        "id": "17971020379370972"
                    },
                    {
                        "timestamp": "2021-03-05T17:37:15+0000",
                        "text": "Rad",
                        "id": "17897585818823806"
                    },
                    {
                        "timestamp": "2021-03-05T16:09:03+0000",
                        "text": "What's that  black plate thingy ?",
                        "id": "17893096414896854"
                    },
                    {
                        "timestamp": "2021-03-05T15:01:47+0000",
                        "text": "#lastchancetobuy #lastchance #nativeunion #techrefined #tomdixon #tomdixonxnativeunion #tablsetup #tableinspo #tableorganization #organizationinspo #ugc #wirelesscharging #wirelesscharger #whatsonmytable #minimallifestyle #minimalliving #minimalist #lightandshadow #techlifestyle #lifestyleinspo #scandihome #japanesestyle #japanesedesign #japaneseliving",
                        "id": "17898246736846601"
                    }
                ]
            },
            "timestamp": "2021-03-05T15:01:44+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/156151180_478707803285010_1885213526888491016_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=bZ6qkh4q8K4AX-rv4un&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=1ac3d8a0ef26adec363932a17e3c6ccc&oe=60A34A1E",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CMCpUD3rNNN\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 13387
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17884049951097511\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 14667
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17884049951097511\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 39
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17884049951097511\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17884049951097511"
        },
        {
            "like_count": 559,
            "comments_count": 9,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-09T09:09:29+0000",
                        "text": "Hey Guys, can I order these in India?",
                        "id": "17922846040554433"
                    },
                    {
                        "timestamp": "2021-03-04T00:26:44+0000",
                        "text": "YES! 100\u0025",
                        "id": "18195296965039391"
                    },
                    {
                        "timestamp": "2021-03-03T16:43:22+0000",
                        "text": "Beautiful! Handcrafted leather is goals",
                        "id": "17930157085478821"
                    },
                    {
                        "timestamp": "2021-03-03T15:17:35+0000",
                        "text": "Beautiful \ud83d\udc96\ud83d\udc96",
                        "id": "17898197566792948"
                    },
                    {
                        "timestamp": "2021-03-03T15:01:28+0000",
                        "text": "#ugc #usergeneratedcontent #techlifestyle #teamapple #applefan #airpodmax #whatsinmybag #whatsonmytable #tablelayout #flatlay #flatlayinspo #applelifestyle #appleandcoffee #myedc #techwear #nativeunion #techrefined #blackflatlay #techflatlay #flatlayinspo #moderntech",
                        "id": "17913003121624265"
                    }
                ]
            },
            "timestamp": "2021-03-03T15:01:23+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/156586671_262806885452189_8208991070787224093_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=P53QFbjO5tcAX983iLn&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=60b7c73fbfa8737c9b9fb0e1ff66747c&oe=60A1E7B0",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CL9frr5oP5K\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 15624
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "18158622952113104\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 16712
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "18158622952113104\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 60
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "18158622952113104\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "18158622952113104"
        },
        {
            "like_count": 566,
            "comments_count": 6,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-28T20:10:16+0000",
                        "text": "Will the c to c belt cable in stock but in variant colours like cosmos, rose & indigo??",
                        "id": "17920172659595578"
                    },
                    {
                        "timestamp": "2021-02-28T21:19:00+0000",
                        "text": "Any thoughts on making a card holder in the same style as the Clic cases? Love the look of the Heritage Card Holder but don\u2019t think it\u2019s for me.",
                        "id": "18193770280065329"
                    },
                    {
                        "timestamp": "2021-02-27T15:01:08+0000",
                        "text": "#reviews #honestreviews #productreview #productdesign #bestcable #ipadaccessories #macbookaccessories #appleaccessories #whatsonmytable #everydayessentials #techlifestyle #techaccessories #nativeunion #workhardanywhere #techrefined #powerallday #everydaycarry #practicalgifts #lifehack #everydayhack #techhack",
                        "id": "17891288617943927"
                    }
                ]
            },
            "timestamp": "2021-02-27T15:01:05+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/154783587_198177855389917_1024289010836668389_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=LN6g0obDB1sAX8ky55V&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=1b3b00557bd04ce17e8c194666a94721&oe=60A263B5",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLzMeHAr7qA\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 19006
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17952139681412222\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 19467
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17952139681412222\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 79
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17952139681412222\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17952139681412222"
        },
        {
            "like_count": 405,
            "comments_count": 3,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-22T11:11:18+0000",
                        "text": "I have the old charger without led light. It has been working excellently for 2 years. But now the cable is getting damaged \ud83d\ude22. Still better than apple cable that lasts only few months.",
                        "id": "17950695412429225"
                    },
                    {
                        "timestamp": "2021-02-26T16:45:24+0000",
                        "text": "Very cool! 8ft is exactly what we need (:",
                        "id": "17865977579357472"
                    },
                    {
                        "timestamp": "2021-02-25T15:49:09+0000",
                        "text": "#cables #usbccable #newperspective #uniquedesign #elevateddesign #productreview #socialproof #bestseller #beltcable #beltcablepro #ipadcable #macbookcable #macbookaircable #nativeunion #techrefined #techsetup #tablesetup #worksetup #workinspo #worksetup #makelifeeasier #whatsinmybag #toppick #appleandcoffee #wfhlifestyle #digitalnomad #remoteworking #remoteworkinglifestyle",
                        "id": "17914369876580539"
                    }
                ]
            },
            "timestamp": "2021-02-25T15:49:05+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/153543418_206821007849033_5460008925118272416_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=iO8jJjvHLsMAX-s-1sw&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=a2e62f88d920723ead9cc66be0b071a1&oe=60A3AD42",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLuIYFDMg1M\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 13029
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17895590437894603\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 13786
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17895590437894603\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 45
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17895590437894603\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17895590437894603"
        },
        {
            "like_count": 334,
            "comments_count": 4,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-02-24T00:28:35+0000",
                        "text": "\u0040nativeunion maybe a silly question...is belt cable pro a usb c to usb c cable, can\u2019t find it on your website.",
                        "id": "17921845384551190"
                    },
                    {
                        "timestamp": "2021-02-23T15:01:10+0000",
                        "text": "#cables #usbccable #sage #newperspective #uniquedesign #elevateddesign #productreview #socialproof #bestseller #beltcable #beltcablepro #ipadcable #macbookcable #macbookaircable #nativeunion #techrefined #techsetup #tablesetup #worksetup #workinspo #worksetup #makelifeeasier #whatsinmybag #toppick #appleandcoffee #wfhlifestyle #digitalnomad #coffeshoplifestyle #remoteworking #remoteworkinglifestyle",
                        "id": "18140728540090395"
                    }
                ]
            },
            "timestamp": "2021-02-23T15:01:06+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/154060215_878830482905347_3059330586439640981_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Xpmamtm4wdQAX-m3gjK&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=da15f287cecce85e321f00906cb0cf3f&oe=60A1F2A3",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLo5SyRryCE\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 13924
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17887968385965024\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 15149
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17887968385965024\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17887968385965024\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17887968385965024"
        },
        {
            "like_count": 366,
            "comments_count": 5,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-02-24T13:51:20+0000",
                        "text": "Need 12 promax\ud83d\ude22",
                        "id": "17889429184929298"
                    },
                    {
                        "timestamp": "2021-02-20T21:21:27+0000",
                        "text": "I sent a dm \u0040nativeunion",
                        "id": "17935721440465300"
                    },
                    {
                        "timestamp": "2021-02-20T17:44:12+0000",
                        "text": "\ud83d\ude0d",
                        "id": "17968077298375039"
                    },
                    {
                        "timestamp": "2021-02-20T15:01:09+0000",
                        "text": "#ChillaxFox #MaisonKitsune #MaisonKitsunexNativeUnion #collaboration #dynamicduo #everydaycarry #iphone12cases #iphone12procases #iphone12minicases #collab #appleandcoffee #cutecases #whatsinmybag #everydayinspo #streetlifestyle #streetstyle #signupforfree #nativeunion #techrefined #tablesetup #flatlay #flatlayinspo #hypestyle #hypelifestyle  #collectionshot #bestsellers #bestselling #bestseller",
                        "id": "17889732202957984"
                    }
                ]
            },
            "timestamp": "2021-02-20T15:01:06+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/152091766_459391931856331_13497267052693519_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=YC3iRcDpZP4AX9BJUNb&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=31018943e11a76c9e8bbd3079a3703d9&oe=60A48ACA",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLhK6Hlj3nR\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17886
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17887408621958669\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 19368
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17887408621958669\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 153
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17887408621958669\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17887408621958669"
        },
        {
            "like_count": 330,
            "comments_count": 5,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-02-18T18:12:43+0000",
                        "text": "\ud83e\udd8a\u2764\ufe0f",
                        "id": "18194489956062079"
                    },
                    {
                        "timestamp": "2021-02-18T15:01:12+0000",
                        "text": "#ChillaxFox #MaisonKitsune #MaisonKitsunexNativeUnion #collaboration #dynamicduo #everydaycarry #airpodsprocases #collab #appleandcoffee #cutecases #whatsinmybag #everydayinspo #streetlifestyle #streetstyle #signupforfree #nativeunion #techrefined #tablesetup #flatlay #flatlayinspo #hypestyle #hypelifestyle #playmymusic",
                        "id": "17889066136916952"
                    }
                ]
            },
            "timestamp": "2021-02-18T15:01:08+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/151001569_516962099268109_3235669125826930951_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=aw9kOivbRh4AX_qQyuL&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=5bcb1811bd7add65adfc289dcd055305&oe=60A27055",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLcBUmbMSvk\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 17551
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "18139647094092207\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 18719
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "18139647094092207\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 94
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "18139647094092207\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "18139647094092207"
        },
        {
            "like_count": 839,
            "comments_count": 20,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-03-23T15:44:18+0000",
                        "text": "Any iPhone 12 Pro clear colour in stock? Thanks",
                        "id": "17883129956146730"
                    },
                    {
                        "timestamp": "2021-02-19T06:18:48+0000",
                        "text": "\ud83e\udd8a",
                        "id": "17915966956596214"
                    },
                    {
                        "timestamp": "2021-02-18T23:46:59+0000",
                        "text": "Curious to know why these ones cover the bottom and the newer iPhone 12 native union covers don\u2019t? Best cover I\u2019ve ever had when I had the XS but pity didn\u2019t follow up for the newer ones. Surely design team know already after a few months of feedback.",
                        "id": "17869737584254836"
                    },
                    {
                        "timestamp": "2021-02-17T01:01:22+0000",
                        "text": "Please get some for iPhone 12pm as well!!!",
                        "id": "17886044305975143"
                    },
                    {
                        "timestamp": "2021-02-16T17:39:37+0000",
                        "text": "\u0040nativeunion are you going to carry this model in a black color way?",
                        "id": "17946283708427383"
                    },
                    {
                        "timestamp": "2021-02-16T16:41:13+0000",
                        "text": "Foxes \ud83e\udd8a",
                        "id": "17886163988018313"
                    },
                    {
                        "timestamp": "2021-02-16T16:13:02+0000",
                        "text": "just received it, that\u2019s really nice \ud83e\udd8a\ud83e\udd0d",
                        "id": "18179873149072839"
                    },
                    {
                        "timestamp": "2021-02-16T15:49:49+0000",
                        "text": "Do you have silicone case for iphone 12 pro max that covers the bottom part and no Maison Kitsune print at the back?",
                        "id": "17859681644392324"
                    },
                    {
                        "timestamp": "2021-02-16T15:08:30+0000",
                        "text": "\ud83d\ude0d",
                        "id": "17890220053949066"
                    },
                    {
                        "timestamp": "2021-02-16T15:01:19+0000",
                        "text": "#ChillaxFox #MaisonKitsune #MaisonKitsunexNativeUnion #collaboration #dynamicduo #everydaycarry #iphone12cases #iphone12procases #iphone12minicases #airpodsprocases #collab #appleandcoffee #cutecases #whatsinmybag #everydayinspo #streetlifestyle #streetstyle #signupforfree #nativeunion #techrefined #tablesetup #flatlay #flatlayinspo #hypestyle #hypelifestyle",
                        "id": "17891530585890563"
                    }
                ]
            },
            "timestamp": "2021-02-16T15:01:16+0000",
            "media_url": "https:\/\/scontent-cdt1-1.cdninstagram.com\/v\/t51.2885-15\/150217601_778931399382986_5252287126338377059_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=AfuQdVZSZNEAX_LBChI&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=e94b8d6b638b07634664125a27230dd5&oe=60A1AE33",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLW3v3nn5bl\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 31704
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "18150480361127957\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 34418
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "18150480361127957\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 313
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "18150480361127957\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "18150480361127957"
        },
        {
            "like_count": 418,
            "comments_count": 3,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-02-16T17:54:31+0000",
                        "text": "Wow those are so cool!",
                        "id": "17879712821126795"
                    },
                    {
                        "timestamp": "2021-02-13T15:01:08+0000",
                        "text": "#nightcable #youandi #giftsforher #giftsforhim #giftsforthem #giftsforus #giftstomatch #valentinesdaygift #vdaygift #giftguide #giftideas #practicalgift #giftsforeveryday #giftshelllove #nativeunion #techrefined #couplegoals #couplestyle #tellmewithouttellingme #loveisinthedetails #loveisinthedetail #homeinspo #interiorinspo #roominspo #tableinspo #tablesetup #nightcable #giftsforanyone #giftsforeveryone",
                        "id": "18046726510304732"
                    }
                ]
            },
            "timestamp": "2021-02-13T15:01:05+0000",
            "media_url": "https:\/\/scontent-cdg2-1.cdninstagram.com\/v\/t51.2885-15\/148558023_478021436917630_6937859360827404805_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=L7UyK5AFChUAX8Jh1Qv&_nc_ht=scontent-cdg2-1.cdninstagram.com&oh=fcbedda8452b3dd5b7bb84e095990e98&oe=60A411B4",
            "media_type": "IMAGE",
            "permalink": "https:\/\/www.instagram.com\/p\/CLPJWApMVqd\/",
            "insights": {
                "data": [
                    {
                        "name": "reach",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 23119
                            }
                        ],
                        "title": "Couverture",
                        "description": "Nombre total de comptes uniques ayant vu le m\u00e9dia",
                        "id": "17885470919022222\/insights\/reach\/lifetime"
                    },
                    {
                        "name": "impressions",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 25208
                            }
                        ],
                        "title": "Impressions",
                        "description": "Nombre total de fois o\u00f9 le m\u00e9dia a \u00e9t\u00e9 vu",
                        "id": "17885470919022222\/insights\/impressions\/lifetime"
                    },
                    {
                        "name": "saved",
                        "period": "lifetime",
                        "values": [
                            {
                                "value": 74
                            }
                        ],
                        "title": "Enregistr\u00e9",
                        "description": "Nombre total de comptes uniques ayant enregistr\u00e9 le m\u00e9dia",
                        "id": "17885470919022222\/insights\/saved\/lifetime"
                    }
                ]
            },
            "id": "17885470919022222"
        }
    ],
      sortedData: [],
      revele: false,
      selectedElement: {
        media_url: "",
        like_count: 0,
        comments_count: 0,
        id: "",
        timestamp: "",
        media_type: "",
        permalink: "",
        reach: "",
        impressions: "",
        saved: "",
        access_token: "",
      },
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });
    let Id = await db
      .collection("Users")
      .doc(this.uid)
      .get()
      .then((doc) => {
        this.access_token = doc.data().access_token;
        this.IgId = doc.data().IgId;
      });
      this.computedData();

    // let url = await new URL(
    //   `https://graph.facebook.com/v10.0/${this.IgId}/media`
    // );
    // url.search = new URLSearchParams({
    //   fields:
    //     "like_count, comments_count,comments,timestamp,media_url,media_type,permalink,insights.metric(reach,impressions,saved)",
    //   filtering: "[{'field':'text','operator':'IN',value:['#']}]",
    //   access_token: this.access_token,
    // });

    // await fetch(url, {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log("query at created");
    //     this.computedData(response);
    //     if (response.paging.next) {
    //       this.nextPageQuery(response.paging.next);
    //     }
    //   });
  },

  methods: {
    modalTransmit(post) {
      this.selectedElement.media_url = post.media_url;
      this.selectedElement.like_count = post.like_count;
      this.selectedElement.id = post.id;
      this.selectedElement.timestamp = post.timestamp;
      this.selectedElement.media_type = post.media_type;
      this.selectedElement.permalink = post.permalink;
      this.selectedElement.reach = post.reach;
      this.selectedElement.impressions = post.impressions;
      this.selectedElement.saved = post.saved;
      this.selectedElement.access_token = this.access_token;

      this.revele = !this.revele;
    },

    async computedData() {
      await console.log("start the compute");
      for (let x = 0; x < this.NUData.length; x++) {
        // await console.log("test insight = ", this.NUData[x]);
        if (this.NUData[x].comments) {
          var tempHash = [];
          tempHash = await this.NUData[x].comments.data[this.NUData[x].comments.data.length - 1].text
            .split("#")
            .filter(Boolean);
          for (let i = 0; i < tempHash.length; i++) {
            if (this.hashcomputed.find((x) => x.hash === tempHash[i].trim())) {
              var index = await this.hashcomputed.findIndex(
                (a) => a.hash === tempHash[i].trim()
              );
              await this.hashcomputed[index].occurence++;
              await this.hashcomputed[index].posts.push({
                id: this.NUData[x].id,
                like_count: this.NUData[x].like_count,
                comments_count: this.NUData[x].comments_count,
                timestamp: this.NUData[x].timestamp,
                media_url: this.NUData[x].media_url,
                media_type: this.NUData[x].media_type,
                permalink: this.NUData[x].permalink,
                reach: this.NUData[x].insights.data[0].values[0].value,
                impressions: this.NUData[x].insights.data[1].values[0].value,
                saved: this.NUData[x].insights.data[2].values[0].value,
              });
            } else {
              await this.hashcomputed.push({
                hash: tempHash[i].trim(),
                occurence: 1,
                posts: [
                  {
                    id: this.NUData[x].id,
                    like_count: this.NUData[x].like_count,
                    comments_count: this.NUData[x].comments_count,
                    timestamp: this.NUData[x].timestamp,
                    media_url: this.NUData[x].media_url,
                    media_type: this.NUData[x].media_type,
                    permalink: this.NUData[x].permalink,
                    reach: this.NUData[x].insights.data[0].values[0].value,
                    impressions:
                      this.NUData[x].insights.data[1].values[0].value,
                    saved: this.NUData[x].insights.data[2].values[0].value,
                  },
                ],
              });
            }
          }
        }
      }
      for (var x = 0; x < this.hashcomputed.length; x++) {
        var arrComments = [];
        var arrLikes = [];
        var arrReach = [];
        var arrImpr = [];
        var arrSaved = [];
        this.hashcomputed[x].totalComments = 0;
        this.hashcomputed[x].totalLikes = 0;
        this.hashcomputed[x].totalReach = 0;
        this.hashcomputed[x].totalImpr = 0;
        this.hashcomputed[x].totalSaved = 0;

        for (var y = 0; y < this.hashcomputed[x].posts.length; y++) {
          await arrComments.push(this.hashcomputed[x].posts[y].comments_count);
          await arrLikes.push(this.hashcomputed[x].posts[y].like_count);
          await arrReach.push(this.hashcomputed[x].posts[y].reach);
          await arrImpr.push(this.hashcomputed[x].posts[y].impressions);
          await arrSaved.push(this.hashcomputed[x].posts[y].saved);
        }
        this.hashcomputed[x].totalComments = await arrComments.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalLikes = await arrLikes.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalReach = await arrReach.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalImpr = await arrImpr.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalSaved = await arrSaved.reduce(
          (a, b) => a + b,
          0
        );
      }
      this.sortedData = this.hashcomputed
      // await console.log("log final data design = ", this.hashcomputed);
    },

    async nextPageQuery(next) {
      console.log("start new query");
      await fetch(next, {
        method: "GET",
      })
        .then((res) => res.json())

        .then((response) => {
          console.log("log de la funct next page", response);
          this.computedData(response);
          if (response.paging.next) {
            this.nextPageQuery(response.paging.next);
            return;
          }
        });
    },

 
    sortByAlphabet() {
      this.sortedData = []
      var byName = this.hashcomputed.slice(0);
      byName.sort(function (a, b) {
        var x = a.hash.toLowerCase();
        var y = b.hash.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });

      console.log("by name:");
      console.log(byName);
      this.sortedData = byName
    },

    sortOccurence() {
      this.sortedData = []
      var byOccurence = this.hashcomputed.slice(0);
      byOccurence.sort(function (a, b) {
        return  b.occurence - a.occurence;
      });
      console.log("by occurence:");
      console.log(byOccurence);
      console.log(this.hashcomputed);
      this.sortedData = (byOccurence)
    },

    sortComments() {
      this.sortedData = []
      var bycomment = this.hashcomputed.slice(0);
      bycomment.sort(function (a, b) {
        return b.totalComments - a.totalComments ;
      });
      console.log("by comment:");
      console.log(bycomment);
      console.log(this.hashcomputed);
      this.sortedData = bycomment
    },

    sortLike() {
      this.sortedData = []
      var byLike = this.hashcomputed.slice(0);
      byLike.sort(function (a, b) {
        return  b.totalLikes - a.totalLikes;
      });
      console.log("by comment:");
      console.log(byLike);
      console.log(this.hashcomputed);
      this.sortedData = byLike
    },

    sortSaved() {
      this.sortedData = []
      var bySaved = this.hashcomputed.slice(0);
      bySaved.sort(function (a, b) {
        return  b.totalSaved - a.totalSaved;
      });
      console.log("by Saved:");
      console.log(bySaved);
      console.log(this.hashcomputed);
      this.sortedData = bySaved
    },

    score(){
      var weightedReach = 2
      var weightedImpression = 1
      var weightedSaved = 4
      var weightedlike = 3
      var weightedComments = 1
      var ponderationTime = 4
      var  ponderationOccurence = 2

      for( var x = 0; x<this.sortedData.length; x++){
        var calculreach = this.sortedData[x].totalReach * weightedReach
        var calculImpression = this.sortedData[x].totalImpr * weightedImpression
        var calculSaved = this.sortedData[x].totalSaved * weightedSaved
        var calculLike = this.sortedData[x].totalLikes * weightedlike
        var calculComments = this.sortedData[x].totalComments * weightedComments
        var score = (calculreach + calculImpression + calculSaved + calculLike + calculComments)/(weightedReach+ weightedImpression + weightedSaved + weightedlike+ weightedComments)
        console.log("test du score ===========> ", this.sortedData[x].hash,  " = ", score )
        console.log("Reach Point ", weightedReach," : ", calculreach)
        console.log("Impression Point ", weightedImpression," : ", calculImpression)
        console.log("Saved Point ", weightedSaved, " : ", calculSaved)
        console.log("Like Point ", weightedlike, " : ", calculLike)
        console.log("Comments Point ", weightedComments, " : ", calculComments)

        this.sortedData[x].score = Math.floor(score)
        this.sortedData[x].calculreach = calculreach
        this.sortedData[x].calculImpression = calculImpression
        this.sortedData[x].calculSaved= calculSaved
        this.sortedData[x].calculLike= calculLike
        this.sortedData[x].calculComments= calculComments
        this.sortedData[x].weightedReach =  weightedReach 
      this.sortedData[x].weightedImpression =        weightedImpression 
      this.sortedData[x].weightedSaved =        weightedSaved 
      this.sortedData[x].weightedlike =        weightedlike 
      this.sortedData[x].weightedComments =        weightedComments 
      }


    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  /* This is better for small screens, once min() is better supported */
  grid-template-rows: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
  margin: 50px 100px 0 100px;
}
.grid > ul > div {
  background: #e7c28a;
  padding: 1.5rem;
  border-radius: 1rem;
}

.grid > ul > div > i {
  color: white;
}

.card {
  display: flex;
  flex-direction: row;
  justify-content:right;
  /* height: 20vh; */
}

.postImage {
  height: 60px;
}

.lastPost {
  display: flex;
  flex-direction: column;
}

.title {
  margin: 50px;
}

.categorie{
  margin-left: 250px;
}
.weighted {
  margin: 0 25px;
}
</style>