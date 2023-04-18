let imageURL_Array = [
    "https://news.cts.com.tw/photo/cts/202201/202201082068174_l.jpg",
    "https://lordcat.tw/wp-content/uploads/2021/09/1631538408-378fce845ce05de4c29be3e870b50e13.jpg",
    "https://cdn.cybassets.com/media/W1siZiIsIjE2MzE3L3Byb2R1Y3RzLzMyMzU4MDY0LzE2MDYzNzI1NzRfZmJmYmUzYmNhZTgzMjNmOGQzNTguanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=f0b7888eaa5e55cc",
    "https://imageproxy.icook.network/resize?background=255%2C255%2C255&nocrop=true&stripmeta=true&type=auto&url=http%3A%2F%2Ftokyo-kitchen.icook.tw.s3.amazonaws.com%2Fuploads%2Frecipe%2Fcover%2F372073%2F60ad2eda9638fa38.jpg&width=443"
];

$(function(){
    $("input").on("click",function(){
        //alert("Hi");
        var numberOfListItem=$("li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        console.log(randomChildNumber);
        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",imageURL_Array[randomChildNumber])
    });
});
