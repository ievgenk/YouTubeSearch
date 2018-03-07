var pageToken = {};

$(function () {

  $('#searchButton').on('click', function (event) {
    searchYouTube();
  })
  $('.tokenClass').on('click', function () {
    pageToken.current = $(this).val() == 'Next' ? pageToken.nextPage : pageToken.prevPage
    console.log($(this).val())
    searchYouTube()
  })

  function searchYouTube() {
    let searchQuery = $('input[type = "text"]').val();
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      dataType: 'json',
      type: 'GET',
      data: {
        key: "AIzaSyDzBMOMurU6qwVbCoZxut_2TktDcfml8ro",
        q: searchQuery,
        part: 'snippet',
        maxResults: 5,
        pageToken: pageToken.current
      }
    }).done(function (data) {
      pageToken.nextPage = data.nextPageToken;
      pageToken.prevPage = data.prevPageToken;
      console.log(data)
      let html = ``;
      $.each(data.items, function (index, value) {
        html += `<div class='title'>${value.snippet.title}</div>`;
        html += `<a href=https://www.youtube.com/watch?v=${value.id.videoId} ><img class="thumbnail" src="${value.snippet.thumbnails.high.url}"></a></div>`

      })
      $('#output').html(html);
    })
  }



})