let test = [{ hash: "test", id: 1, like: 5 }, { hash: "XPS", id: 2, like: 100 },]
var occur = 0

var response = {
    "data": [
        {
            "like_count": 0,
            "comments_count": 1,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-12T13:35:19+0000",
                        "text": "#test #xps #laptop #desk",
                        "id": "17927199403559274"
                    }
                ]
            },
            "id": "17985619534353889"
        },
        {
            "like_count": 0,
            "comments_count": 2,
            "comments": {
                "data": [
                    {
                        "timestamp": "2021-04-12T13:32:32+0000",
                        "text": "#test #view",
                        "id": "17888699597029296"
                    },
                    {
                        "timestamp": "2021-04-12T13:32:26+0000",
                        "text": "#test #view",
                        "id": "17902185985802763"
                    }
                ]
            },
            "id": "18214250929010658"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17944081270440883"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17917389838622870"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17898081472930700"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17869645550479704"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17863551800417678"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18174181927102595"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17900563696879762"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18217005337048555"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18079325788269189"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17977435396365425"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17886211061058365"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17926605328544651"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17880118025204225"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17862619850433754"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18105765466224041"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17900863639812176"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18155440342132169"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18098519425243602"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17884757675135325"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17967012835379135"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "17893183876911819"
        },
        {
            "like_count": 0,
            "comments_count": 0,
            "id": "18119430904207888"
        },
        {
            "like_count": 0,
            "comments_count": 1,
            "id": "17902894459760517"
        }
    ],
    "paging": {
        "cursors": {
            "before": "QVFIUlYtUEFvc1NMUXZAzeHd0MTBsZAFc1QXNuOU9oLXlMaDMzTGJXVmtxLUJMdDZAHeWJuQjVDc2xjbjlCSUVLdm9icnVVT3BuclE2RjMxWHQxbnhXTTNtbEpR",
            "after": "QVFIUmJFbWpDS0pfaFNHTkFBQmRKMnhERXRQYkdGbjVoX1kwRUp4dGZABOV9LRDdxelRWMkhrenAtSnhVbDJqRlFBX1NEek1Dd2lSQUFqNDdHM05VNF9hcjhB"
        },
        "next": "https://graph.facebook.com/v10.0/17841446016764337/media?access_token=EAAD4764ZBe5oBAJHVfDiBt529WWIYRuLCvN2c1ZCpZCq5k1nz5F1mImymmWNr57ZAf7Ru8JZAGZAZAMjehBjnP4aZAxGCr9BdrZBlpZAwhmr8B8csCTQOaZCgpP1ZBBQDPsZAfbuNZAx3PZBMKzUaTcZCXJ48jgZAeQcZAsLZC9397mRMFmrZAQHT4GhQpz1MY59&pretty=1&fields=like_count%2C+comments_count%2Ccomments&filtering=%5B%7B%27field%27%3A%27text%27%2C%27operator%27%3A%27IN%27%2Cvalue%3A%5B%27%23%27%5D%7D%5D&limit=25&after=QVFIUmJFbWpDS0pfaFNHTkFBQmRKMnhERXRQYkdGbjVoX1kwRUp4dGZABOV9LRDdxelRWMkhrenAtSnhVbDJqRlFBX1NEek1Dd2lSQUFqNDdHM05VNF9hcjhB"
    }
}


console.log(test.find(x => x.hash === "test"))

// if (test.findIndex(x => x.hash === "test")) {
//     occur = +1

// }

// console.log(occur)


for (let x = 0; x < response.data.length; x++) {
    var tempHash = [];
    tempHash = response.data[x].comments.data[0].text
        .split("#")
        .filter(Boolean);
    for (let i = 0; i < tempHash.length; i++) {
        console.log(tempHash[i].trim())
        if (test.find(x => x.hash === tempHash[i].trim())) {
            var index = test.findIndex(a => a.hash === tempHash[i].trim());
            console.log(index)
            console.log(test[index])
            // test[index].occurence = +1;
            // test[index].posts = {
            //     id: response.data[x].id,
            //     comments_count: response.data[x].comments_count,
            //     like_count: response.data[x].like_count,
            // };
            console.log("test true", i)
        } else {
            test = {
                hash: tempHash[i],
                occurence: 1,
                post: {
                    id: response.data[x].id,
                    like_count: response.data[x].like_count,
                    comments_count: response.data[x].comments_count,
                },
            };
            console.log("test False", i)
        }
    }
}



console.log(test)