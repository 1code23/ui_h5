toggleEllipsis(".j-devinfo-content", ".j-toggle-devinfo-btn");
toggleEllipsis(".j-desc-content", ".j-toggle-desc-btn");
bindPlay();

function toggleEllipsis(e, i) {
  var t = $(e),
    n = $(i);

  $("body").on("click", i, function () {
    t.hasClass("ellipsis")
      ? (t.removeClass("ellipsis"), n.text("收起全部"))
      : (t.addClass("ellipsis"), n.text("展开全部"));
  });
}

function bindPlay() {
  $(".layout").on("click", ".j-play-btn", function () {
    $(".video-cover-img").hide(),
      $(".video-play-btn").hide(),
      $(".video-layer").find("video")[0].play();
  });
}

$(".game__download__btn--open").on("click", function () {
  location.href =
    "https://ugame.9game.cn/game/downloadGame?pack.cooperateModelId=238686&pack.id=48961156&from=share";
});
