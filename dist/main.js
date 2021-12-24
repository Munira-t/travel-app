var Client = function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var a = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
  }
  return n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    })
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var a in e) n.d(r, a, function (t) {
        return e[t]
      }.bind(null, a));
    return r
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 1)
}([function (e, t, n) {}, function (e, t, n) {
  "use strict";
  n.r(t), n.d(t, "handleSubmit", (function () {
    return l
  })), n.d(t, "getTripDuration", (function () {
    return r
  })), n.d(t, "getDay", (function () {
    return o
  })), n.d(t, "formatDate", (function () {
    return i
  }));
  var r = (e, t) => {
    let n = new Date(e);
    return (new Date(t).getTime() - n.getTime()) / 864e5
  };
  var a = e => {
    document.getElementById("main").innerHTML = `\n  <section class="trip-section">\n    <div class="trip-container">\n      <div class="trip-header" id="trip-header">\n        \x3c!-- <div class="city-flag"> --\x3e\n        <img class="city-flag" src=${e.countryFlag} alt="flag" id="city-flag">\n        <div class="location-name">\n          <h2 id="country-name">${e.countryName}</h2>\n          <p id="city-name">${e.destCityName}</p>\n        </div>\n      </div>\n      <div class="trip-main">\n        <div class="trip-weather">\n          <img src="${e.weatherIcon}" alt="weather icon" id="weather-icon">\n          <p id="weather-temp">${e.weatherTemp}°</p>\n          <p id="weather-description">${e.weatherDescription}</p>\n        </div>\n        <div class="trip-info">\n          <h4 class="trip-title">Your trip will </h4>\n          <div class="trip-date">\n            <div class="start-date-section">\n              <p>Begin in</p>\n              <div id="departure-date">${e.departureDate}</div>\n              <div id="departure-day">${e.departureDay}</div>\n            </div>\n            <div class="end-date-section">\n              <p>End in</p>\n              <div id="arrival-date">${e.arriveDate}</div>\n              <div id="arrivel-day">${e.arriveDay}</div>\n            </div>\n          </div>\n          <div class="trip-duration-section">\n            <p>The trip lasts</p>\n            <div id="trip-duration">${e.tripDuration} Days</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>`;
    document.getElementById("trip-header").style.backgroundImage = `url(${e.image})`
  };
  const i = e => {
      let t = new Date(e);
      const n = t.getDate(),
        r = t.getFullYear();
      return `${n}/${t.getMonth()+1}/${r}`
    },
    o = e => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(e).getDay()];
  let d = {};
  const c = async (e = "", t = {}) => {
    const n = await fetch(e, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
    });
    try {
      return await n.json()
    } catch (e) {
      console.error(e.message)
    }
  };
  var l = async function () {
    const e = document.getElementById("destination-city").value,
      t = document.getElementById("departure-date").value,
      n = document.getElementById("arrive-date").value;
    console.log(e), console.log(t), d.departureDate = i(t), d.arriveDate = i(n), d.departureDay = o(t), d.arriveDay = o(n);
    const l = r(t, n);
    d.tripDuration = l, "" === e ? alert("Please Enter your destinatin.") : n <= t ? alert("The arrive date can not be befor departure date") : c("http://localhost:8087/destination", {
      destinationCity: e
    }).then(e => {
      d.lang = e.lang, d.lat = e.lat, d.destCityName = e.destCityName, d.countryName = e.countryName, d.countryCode = e.countryCode, console.log(e), console.log(d), c("http://localhost:8087/countryflag", {
        countryCode: d.countryCode
      }).then(e => {
        d.countryFlag = e.countryFlag, console.log(d)
      }), c("http://localhost:8087/weather", {
        lang: d.lang,
        lat: d.lat
      }).then(e => {
        d.weatherDescription = e.weatherDescription, d.weatherTemp = e.weatherTemp, d.weatherIcon = e.weatherIcon, console.log(d)
      }), c("http://localhost:8087/image", {
        destCityName: d.destCityName
      }).then(e => {
        d.image = e.image, console.log(d), a(d)
      })
    })
  };
  n(0), n.p;
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("trip-input-form").addEventListener("submit", e => {
      e.preventDefault(), l()
    })
  })
}]);