const request = require('request');
const cheerio = require('cheerio');
const db = require('./db');
const Post = require('./model');

function getDetailPost(url, type) {
  request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);

      const title = $('.page-h1 a').text().toUpperCase(); //get title post

      let addressArray = $('.post-address').text(); //get address post
      addressArray = addressArray.split(',');
      addressArray = addressArray.map((element) => (element = element.trim()));
      let nAddress = addressArray.length;
      if (
        addressArray[nAddress - 4] === undefined ||
        addressArray[nAddress - 4] === null
      )
        return;

      const address = {
        street: addressArray[nAddress - 4].substring(
          9,
          addressArray[nAddress - 4].length,
        ),
        ward: addressArray[nAddress - 3],
        district: addressArray[nAddress - 2],
        province: addressArray[nAddress - 1],
      };

      let descriptionArr = $('.post-main-content .section-content p').map(
        (i, element) => {
          return $(element).text();
        },
      );

      const description = [...descriptionArr];

      let area = $('.acreage span').text();
      area = area.trim().substring(0, area.length - 3);

      const retail = $('.price span').text().split(' ')[0];
      if (retail.length > 3) return;
      const typeAccommdation = 1;

      const imagesObj = $('.post-images .swiper-slide img').map(
        (i, element) => ({
          src: $(element).attr('src'),
          alt: $(element).attr('alt'),
        }),
      );

      const images = [...imagesObj];
      if (images.length === 0) return;
      const typePost = type;

      const timeStart = new Date();

      const timeEnd = new Date(timeStart);
      timeEnd.setDate(timeStart.getDate() + 40);

      user_id = '60a356907d8aec247fcb25ff';

      // console.log({
      //   timeStart,
      //   timeEnd,
      //   typePost,
      //   user_id,
      //   accommodation: {
      //     address,
      //     title,
      //     description,
      //     area,
      //     retail,
      //     typeAccommdation,
      //     images: images,
      //   },
      // });

      try {
        const newPost = new Post({
          timeStart,
          timeEnd,
          typePost,
          user_id,
          accommodation: {
            address,
            title,
            description,
            area,
            retail,
            typeAccommdation,
            images: images,
          },
        });

        newPost.save((err, data) => {
          if (err) {
            console.log(err);

            throw new Error('fail to save');
          }
          console.log(data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
}

// getDetailPost(
//   'https://phongtro123.com/tinh-thanh/ho-chi-minh/ki-tuc-xa-nu-cao-cap-day-du-tien-nghi-chuan-5-ngay-cmt8-va-to-hien-thanh-lh-0973373779.html',
// );

function getUrlPost(url, type) {
  request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);
      const urlPost = $('.section-post-listing figure a').map((i, el) => {
        return $(el).attr('href');
      });

      for (let i = 0; i < urlPost.length; i++) {
        getDetailPost(`https://phongtro123.com${urlPost[i]}`, type);
      }
    }
  });
}

for (let i = 1; i <= 50; i++) {
  if (i < 10) getUrlPost(`https://phongtro123.com/?page=${i}`, 1);
  else if (i < 25) getUrlPost(`https://phongtro123.com/?page=${i}`, 2);
  else getUrlPost(`https://phongtro123.com/?page=${i}`, 3);
}
