const topic = require('./crawl/topic');
const file = require('./crawl/file');

// topic.getAllTopic().then(data => {
//     file.saveFile('./data/topic.json', JSON.stringify(data));
// });

topic.getTopicDetail().then(data => {
    data.forEach(item => {
        file.saveFile(`./data/topics/${item.id}.json`, JSON.stringify(item));
    });
});;