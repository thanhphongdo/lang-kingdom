const axios = require('axios');
const _ = require('underscore');
const file = require('./file');

module.exports = {
    getAllNews() {
        function getNewsAtPage(page) {
            console.log(`https://api.langkingdom.com/video/list-all-trend?preview=1&page=${page}`);
            var config = {
                method: 'get',
                url: `https://api.langkingdom.com/video/list-all-videos?preview=1&page=${page}`,
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'x-app-version': '3.3.3',
                    'Cookie': 'remember_82e5d2c56bdd0811318f0cf078b78bfc=eyJpdiI6Ino2WFFTK0xxWTR3YWYwZHZCRVlFOEE9PSIsInZhbHVlIjoiTTNGcTlnZ0Y5MlE5QlFcL2VQN1owMFo5S2JiMUNndFRvU0plUE10Zm9FVm5wZFdaSkR1b1lHZ1l1ZmJtV3ZyYXRsdkYyTGlnZTBSQXhEQ044cFowQ2FISVMyN3pYc0hPblJDMG9NK0xpZEhnPSIsIm1hYyI6ImZmZjQ4ZjhiZmI1MGU2Y2NmYjU2YTAyZGZlN2U2MTAxZDRmNzM4M2NhOWEyZTQ2Y2QzOGUwYTBmZDYwODc3ZmYifQ%3D%3D; lk_session=eyJpdiI6IkIxRjl3MGkrTDl6RjlFT0N4bzllb2c9PSIsInZhbHVlIjoibzhockQ3WGl2aDA2TTdUOTh0VXVPcE5uU3pOSUtycjJadEViYlZtblBVNGlWUGEydVBjSTFCTTViK1kycnFYQStHXC82SVF3SklLNWRPXC9abTZIeGVmZz09IiwibWFjIjoiMzcxMDcyM2ViYWYwYjE4N2Y1NWI3NmYwMmQ0ZDgwZWY2MzRmYzllN2YyODI4NTA3NGM3MzM1Nzk1NjQ4ZjcyMSJ9'
                }
            };

            return axios(config)
                .then(function (response) {
                    if (response.data.videos && response.data.videos.length) {
                        return response.data.videos;
                    }
                    return Promise.reject();
                })
                .catch(function (err) {
                    return [];
                });
        }
        let page = 1;
        return new Promise((resolve, reject) => {
            let data = []
            function getNews() {
                getNewsAtPage(page).then((news) => {
                    data = data.concat(news);
                    page++;
                    if (page > 206) {
                        console.log('STOP');
                        resolve(data);
                        return;
                    }
                    getNews();
                }).catch(() => {
                    resolve(data);
                });
            }
            getNews();
        });
    },
    getNewsDetail() {
        function getNewsDetailById(id) {
            var config = {
                method: 'get',
                url: `https://api.langkingdom.com/video/get-video-detail?video_id=${id}`,
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'x-app-version': '3.3.3',
                    'Cookie': 'remember_82e5d2c56bdd0811318f0cf078b78bfc=eyJpdiI6Ino2WFFTK0xxWTR3YWYwZHZCRVlFOEE9PSIsInZhbHVlIjoiTTNGcTlnZ0Y5MlE5QlFcL2VQN1owMFo5S2JiMUNndFRvU0plUE10Zm9FVm5wZFdaSkR1b1lHZ1l1ZmJtV3ZyYXRsdkYyTGlnZTBSQXhEQ044cFowQ2FISVMyN3pYc0hPblJDMG9NK0xpZEhnPSIsIm1hYyI6ImZmZjQ4ZjhiZmI1MGU2Y2NmYjU2YTAyZGZlN2U2MTAxZDRmNzM4M2NhOWEyZTQ2Y2QzOGUwYTBmZDYwODc3ZmYifQ%3D%3D; lk_session=eyJpdiI6IkIxRjl3MGkrTDl6RjlFT0N4bzllb2c9PSIsInZhbHVlIjoibzhockQ3WGl2aDA2TTdUOTh0VXVPcE5uU3pOSUtycjJadEViYlZtblBVNGlWUGEydVBjSTFCTTViK1kycnFYQStHXC82SVF3SklLNWRPXC9abTZIeGVmZz09IiwibWFjIjoiMzcxMDcyM2ViYWYwYjE4N2Y1NWI3NmYwMmQ0ZDgwZWY2MzRmYzllN2YyODI4NTA3NGM3MzM1Nzk1NjQ4ZjcyMSJ9'
                }
            };

            return axios(config)
                .then(function (response) {
                    return response.data.videos[0];
                })
                .catch(function (err) {
                    return Promise.reject(err);
                });
        }
        function getPatchTopic(ids) {
            // console.log(ids);
            const patch = ids.map(id => {
                return getNewsDetailById(id);
            });
            return Promise.all(patch);
        }
        const videos = require('../data/news-info.json');
        const idPatch = [];
        for (var i = 0; i <= Math.ceil(videos.length / 10); i++) {
            let ids = [];
            for (let j = (i - 1) * 10; j < i * 10; j++) {
                if (videos[j]) {
                    ids.push(videos[j].id);
                }
            }
            idPatch.push(ids);
        }
        let count = 0;
        return new Promise((resolve, reject) => {
            let data = []
            function getNewsDetail() {
                getPatchTopic(idPatch[count]).then((videos) => {
                    data = data.concat(videos);
                    videos.forEach(item => {
                        file.saveFile(`./data/news/${item.id}.json`, JSON.stringify(item));
                    });
                    console.log('GET PATH: ' + count);
                    count++;
                    if (count >= idPatch.length) {
                        resolve(data);
                    }
                    getNewsDetail();
                }).catch(() => {
                    resolve(data);
                });
            }
            getNewsDetail();
        });
    },
    makeNewsInfo() {
        const videos = require('../data/news.json');
        return _.uniq(videos.map(item => {
            return {
                id: item.id,
                url: item.url,
                title: item.title,
                thumbnail: item.thumbnail,
                duration: item.duration,
            }
        }), 'url');
    },
    makeNewsInfoForSearch() {
        const videos = require('../data/news-info.json');
        return videos.map(item => {
            return {
                id: item.id,
                title: item.title
            }
        });
    }
}