const topic = require('./crawl/topic');
const video = require('./crawl/video');
const file = require('./crawl/file');

// topic.getAllTopic().then(data => {
//     file.saveFile('./data/topic.json', JSON.stringify(data));
// });

// topic.getTopicDetail().then(data => {
//     data.forEach(item => {
//         file.saveFile(`./data/topics/${item.id}.json`, JSON.stringify(item));
//     });
// });

video.getAllVideo().then(data => {
    console.log(data.length);
    console.log('SAVE VIDEO...');
    file.saveFile('./data/video.json', JSON.stringify(data));
});

// const data = require('./data/video.json');
// console.log(data.length);