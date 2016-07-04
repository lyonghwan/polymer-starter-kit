/*
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';
  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = {};
  var domBind = document.querySelector('#domBind');
  console.log(app);
  // Sets app default base URL
  // app.baseUrl = '/';
  // if (window.location.port === '') {  // if production
  //   // Uncomment app.baseURL below and
  //   // set app.baseURL to '/your-pathname/' if running from folder in production
  //   // app.baseUrl = '/polymer-starter-kit/';
  // }

  // app.displayInstalledToast = function() {
  //   // Check to make sure caching is actually enabled—it won't be in the dev environment.
  //   if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
  //     Polymer.dom(document).querySelector('#caching-complete').show();
  //   }
  // };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  // app.addEventListener('dom-change', function() {
  //   console.log('Our app is ready to rock!');
  // });
  
  // See https://github.com/Polymer/polymer/issues/1381
  // window.addEventListener('WebComponentsReady', function() {
  //   // imports are loaded and elements have been registered
  // });
  var webComponentsSupported = ('registerElement' in document &&
    'import' in document.createElement('link') &&
    'content' in document.createElement('template'));

  function finishLazyLoading() {
    // (Optional) Use native Shadow DOM if it's available in the browser.
    // WARNING! This will mess up the page.js router which uses event delegation
    // and expects to receive events from anchor tags. These events get re-targeted
    // by the Shadow DOM to point to <my-app>
    // window.Polymer = window.Polymer || {dom: 'shadow'};

    // When base-bundle.html with elements is loaded
    var onImportLoaded = function() {
      console.log('Imports are loaded and elements have been registered!');
      
      // Remove skeleton
      // var skeleton = document.getElementById('skeleton');
      // skeleton.remove();

      if (webComponentsSupported) {
        // Emulate WebComponentsReady event for browsers supporting Web Components natively
        // (Chrome, Opera, Vivaldi)
        document.dispatchEvent(
          new CustomEvent('WebComponentsReady', {bubbles: true})
        );
      }
    };

    // var elementsBaseBundle = document.getElementById('elementsBaseBundle');

    // Go if the async Import loaded quickly. Otherwise wait for it.
    // crbug.com/504944 - readyState never goes to complete until Chrome 46.
    // crbug.com/505279 - Resource Timing API is not available until Chrome 46.
    if (elementsBaseBundle.import && elementsBaseBundle.import.readyState === 'complete') {
      console.log('elementsBaseBundle import');
      onImportLoaded();
    } else {
      // console.log('load');
      elementsBaseBundle.addEventListener('load', onImportLoaded);
    }
  }

  if (!webComponentsSupported) {
    console.log('Web Components aren\'t supported!');
    var script = document.createElement('script');
    script.async = true;
    script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
    script.onload = finishLazyLoading;
    document.head.appendChild(script);
  } else {
    console.log('Web Components are supported!');
    var script = document.createElement('script');
    script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
    finishLazyLoading();
  }

  domBind.addEventListener('WebComponentsReady', function(){
  })

  document.addEventListener('things-i18n-ready', function(){
    app = document.querySelector('app');
    if(!app&&window.location.pathname=='/index_io.html'){
      app = document.createElement('things-oi-app');
      app.id = 'app';
      document.body.appendChild(app)
    }else if(!app){
      app = document.createElement('things-app');
      app.id = 'app';
      document.body.appendChild(app)
    }
  })

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function(e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Scroll page to top and expand header
  // app.scrollPageToTop = function() {
  //   app.$.headerPanelMain.scrollToTop(true);
  // };

  // app.closeDrawer = function() {
  //   app.$.paperDrawerPanel.closeDrawer();
  // };

})(document);
