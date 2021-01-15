const axios = require('axios');

module.exports = {
    getAllTopic() {
        function getTopicAtPage(page) {
            var config = {
                method: 'get',
                url: `https://api.langkingdom.com/playlist/list-all-playlists?preview=1&page=${page}`,
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'x-app-version': '3.3.3',
                    'Cookie': 'remember_82e5d2c56bdd0811318f0cf078b78bfc=eyJpdiI6Ino2WFFTK0xxWTR3YWYwZHZCRVlFOEE9PSIsInZhbHVlIjoiTTNGcTlnZ0Y5MlE5QlFcL2VQN1owMFo5S2JiMUNndFRvU0plUE10Zm9FVm5wZFdaSkR1b1lHZ1l1ZmJtV3ZyYXRsdkYyTGlnZTBSQXhEQ044cFowQ2FISVMyN3pYc0hPblJDMG9NK0xpZEhnPSIsIm1hYyI6ImZmZjQ4ZjhiZmI1MGU2Y2NmYjU2YTAyZGZlN2U2MTAxZDRmNzM4M2NhOWEyZTQ2Y2QzOGUwYTBmZDYwODc3ZmYifQ%3D%3D; lk_session=eyJpdiI6IkIxRjl3MGkrTDl6RjlFT0N4bzllb2c9PSIsInZhbHVlIjoibzhockQ3WGl2aDA2TTdUOTh0VXVPcE5uU3pOSUtycjJadEViYlZtblBVNGlWUGEydVBjSTFCTTViK1kycnFYQStHXC82SVF3SklLNWRPXC9abTZIeGVmZz09IiwibWFjIjoiMzcxMDcyM2ViYWYwYjE4N2Y1NWI3NmYwMmQ0ZDgwZWY2MzRmYzllN2YyODI4NTA3NGM3MzM1Nzk1NjQ4ZjcyMSJ9'
                }
            };

            return axios(config)
                .then(function (response) {
                    if (response.data.all.length) {
                        return response.data.all;
                    }
                    return Promise.reject();
                })
                .catch(function (err) {
                    return Promise.reject(err);
                });
        }
        let page = 1;
        return new Promise((resolve, reject) => {
            let data = []
            function getTopic() {
                getTopicAtPage(page).then((topic) => {
                    data = data.concat(topic);
                    page++;
                    getTopic();
                }).catch(() => {
                    resolve(data);
                });
            }
            getTopic();
        });
    },
    getTopicDetail() {
        function getTopicDetailById(id) {
            var config = {
                method: 'get',
                url: `https://api.langkingdom.com/playlist/list-data?id=${id}`,
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'x-app-version': '3.3.3',
                    'Cookie': 'remember_82e5d2c56bdd0811318f0cf078b78bfc=eyJpdiI6Ino2WFFTK0xxWTR3YWYwZHZCRVlFOEE9PSIsInZhbHVlIjoiTTNGcTlnZ0Y5MlE5QlFcL2VQN1owMFo5S2JiMUNndFRvU0plUE10Zm9FVm5wZFdaSkR1b1lHZ1l1ZmJtV3ZyYXRsdkYyTGlnZTBSQXhEQ044cFowQ2FISVMyN3pYc0hPblJDMG9NK0xpZEhnPSIsIm1hYyI6ImZmZjQ4ZjhiZmI1MGU2Y2NmYjU2YTAyZGZlN2U2MTAxZDRmNzM4M2NhOWEyZTQ2Y2QzOGUwYTBmZDYwODc3ZmYifQ%3D%3D; lk_session=eyJpdiI6IkIxRjl3MGkrTDl6RjlFT0N4bzllb2c9PSIsInZhbHVlIjoibzhockQ3WGl2aDA2TTdUOTh0VXVPcE5uU3pOSUtycjJadEViYlZtblBVNGlWUGEydVBjSTFCTTViK1kycnFYQStHXC82SVF3SklLNWRPXC9abTZIeGVmZz09IiwibWFjIjoiMzcxMDcyM2ViYWYwYjE4N2Y1NWI3NmYwMmQ0ZDgwZWY2MzRmYzllN2YyODI4NTA3NGM3MzM1Nzk1NjQ4ZjcyMSJ9'
                }
            };

            return axios(config)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    return Promise.reject(err);
                });
        }
        function getPatchTopic(ids) {
            console.log(ids);
            const patch = ids.map(id => {
                return getTopicDetailById(id);
            });
            return Promise.all(patch);
        }
        const topics = require('../data/topic.json');
        const idPatch = [];
        for (var i = 0; i <= Math.ceil(topics.length / 10); i++) {
            let ids = [];
            for (let j = (i - 1) * 10; j < i * 10; j++) {
                if (topics[j]) {
                    ids.push(topics[j].id);
                }
            }
            idPatch.push(ids);
        }
        let count = 0;
        return new Promise((resolve, reject) => {
            let data = []
            function getTopicDetail() {
                getPatchTopic(idPatch[count]).then((topics) => {
                    data = data.concat(topics)
                    count++;
                    if (count >= idPatch.length) {
                        resolve(data);
                    }
                    getTopicDetail();
                }).catch(() => {
                    resolve(data);
                });
            }
            getTopicDetail();
        });
    }
}