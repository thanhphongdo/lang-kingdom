const topic = require('./crawl/topic');
const video = require('./crawl/video');
const news = require('./crawl/news');
const file = require('./crawl/file');

// topic.getAllTopic().then(data => {
//     file.saveFile('./data/topic.json', JSON.stringify(data));
// });

// topic.getTopicDetail().then(data => {
//     data.forEach(item => {
//         file.saveFile(`./data/topics/${item.id}.json`, JSON.stringify(item));
//     });
// });

// video.getAllVideo().then(data => {
//     console.log(data.length);
//     console.log('SAVE VIDEO...');
//     file.saveFile('./data/video.json', JSON.stringify(data));
// });

// file.saveFile('./data/video-info.json', JSON.stringify(video.makeVideoInfo()));
// file.saveFile('./data/video-info-search.json', JSON.stringify(video.makeVideoInfoForSearch()));

// video.getVideoDetail().then(data => {
//     console.log(data.length);
//     // data.forEach(item => {
//     //     file.saveFile(`./data/topics/${item.id}.json`, JSON.stringify(item));
//     // });
// });

// const data = require('./data/video.json');
// console.log(data.length);

// news.getAllNews().then(data => {
//     console.log(data.length);
//     console.log('SAVE VIDEO...');
//     file.saveFile('./data/news.json', JSON.stringify(data));
// });

// file.saveFile('./data/news-info.json', JSON.stringify(news.makeNewsInfo()));
// file.saveFile('./data/news-info-search.json', JSON.stringify(news.makeNewsInfoForSearch()));
news.getNewsDetail().then(data => {
    console.log(data.length);
});