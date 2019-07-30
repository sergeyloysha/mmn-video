"use strict";

var MmnVideo = (function() {
  var data = {
    list: NodeList,
    elements: NodeList,
    wrappers: NodeList
  };
  var classes = {
    wrapper: "mmn-video-wrapper",
    element: "mmn-video-element",
    active: "mmn-video-element-stuck"
  };

  var createWrappers = function createWrappers() {
    for (var i = 0; i < data.list.length; i++) {
      var element = document.createElement("div");
      element.classList.add(classes.element);
      var wrapper = document.createElement("div");
      wrapper.classList.add(classes.wrapper);
      data.list[i].parentNode.insertBefore(element, data.list[i]);
      element.parentNode.insertBefore(wrapper, element);
      element.appendChild(data.list[i]);
      wrapper.appendChild(element);
    }

    data.wrappers = document.querySelectorAll("." + classes.wrapper);
    data.elements = document.querySelectorAll("." + classes.element);
  };

  var isElementOutViewport = function isElementOutViewport(el) {
    return el.getBoundingClientRect().bottom <= 0;
  };

  var getCurrentIndex = function getCurrentIndex() {
    var index = null;

    for (var i = 0; i < data.wrappers.length; i++) {
      if (isElementOutViewport(data.wrappers[i])) {
        index = i;
      }
    }

    return index;
  };

  var onScroll = function onScroll() {
    var index = getCurrentIndex();

    for (var i = 0; i < data.wrappers.length; i++) {
      if (i !== index) {
        data.wrappers[i].style.height = "initial";
        data.elements[i].classList.remove(classes.active);
      }
    }

    if (index !== null) {
      data.wrappers[index].style.height =
        data.wrappers[index].offsetHeight + "px";
      data.elements[index].classList.add(classes.active);
    }
  };

  var init = function init(selector) {
    if (!selector) {
      console.error("Please provide video selector.");
      return;
    }

    if (!document.querySelector(selector)) {
      console.error("Can't find any video.");
      return;
    }

    data.list = document.querySelectorAll(selector);
    createWrappers();
    window.addEventListener("scroll", onScroll);
  };

  return {
    init: init
  };
})();
