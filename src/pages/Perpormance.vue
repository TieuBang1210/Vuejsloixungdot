<template>
    <div class="tabs">
      <figure v-for="tab in tabs" 
              :key="tab.id"
              class="tab"
              :class="getTabClass(tab.id)">
        <nav class="tab__header">
          <button class="tab__button"
                  @click="selectTabById(tab.id)">
            <span class="bar"
                  v-for="i in (tab.id + 1)"></span>
          </button>
        </nav>
        <article class="tab__content">
          <div class="skeleton"
               v-for="content in tab.content"
               v-bind:style="{ width: content.width + '%' }"></div>
        </article>
      </figure>
    </div>
  </template>
  
  <script>
  const TABS_AMOUNT = 3;
  const CONTENT = Array.from({ length: TABS_AMOUNT },
    () => Array.from(
      { length: 4 }, 
      () => ({ width: 70 + Math.random() * 20 })
    )
  );
  
  export default {
    data() {
      return {
        tabs: CONTENT.map((content, id) => ({
          id,
          content
        })),
        currentTabIndex: 0,
        prevTabIndex: 2
      };
    },
    methods: {
      getTabClass(id) {
        return [{
          'tab--current': this.currentTabIndex === id,
          'tab--prev': this.prevTabIndex === id
        }];
      },
      selectTabById(id) {
        if (id === this.currentTabIndex) { return; }
        this.prevTabIndex = this.currentTabIndex;
        this.currentTabIndex = id;
      }
    },
  };
  </script>
  
  <style>
    *,
    ::before,
    ::after {
      box-sizing: border-box;
    }
  
    /* html,
    /* body {
      width: 100%;
      height: 100%;
    } */ */
    
    html {
      --color-light: #665e68;
      --color-regular: #353637;
      --color-semidark: #9f946f;
      --color-dark: #bfb48f;
      --color-accent: #f2efe9;
      --color-background: #564e58;
      --color-background-a: #200e15;
      --color-background-b: #151617;
      
      font-family: Arial, sans-serif;
      display: flex;
      background:
        linear-gradient(
          to bottom,
          var(--color-background-b),
          var(--color-background-a)
        );
      overflow: hidden;
    }
  
    body {
      color: var(--color-regular);
      margin: 0;
      flex: 1;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
    }
    
    .tabs {
      min-width: 400px;
      max-width: 100%;
      position: relative;
      perspective: 1000px;
      height: 300px;
    }
  
    .tab {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      pointer-events: none;
      display: flex;
      flex-flow: column;
      z-index: 0;
      animation: swipe 1200ms ease;
      
      --border-radius: 12px;
      --border-radius-small: calc(var(--border-radius) / 4);
    }
  
    .tab__header {
      background: transparent;
      display: flex;
      height: calc(3em + var(--border-radius-small));
      margin-bottom: calc(0px - var(--border-radius-small));
      padding: 0 var(--border-radius-small);
    }
  
    .tab__button {
      position: relative;
      pointer-events: all;
      cursor: pointer;
      font: inherit;
      outline: none;
      border: 0;
      color: var(--color-light);
      background: var(--color-semidark);
      width: 32.5%;
      font-weight: 600;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      transition: all 160ms ease;
    }
    
    .tab__button:hover {
      background: var(--color-dark);
    }
    
    .tab.tab--current {
      animation: none;
      z-index: 1;
    }
    
    .tab.tab--current .tab__content,
    .tab.tab--current .tab__button,
    .tab.tab--prev .tab__content,
    .tab.tab--prev .tab__button {
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.36);
    }
    
    .tab.tab--prev {
      z-index: -1;
    }
    
    .tab.tab--current .tab__button {
      color: var(--color-regular);
      background: var(--color-accent);
    }
    
    .tab:nth-child(1) .tab__button {
      justify-self: flex-start;
      margin: 0 auto 0 0;
    }
    
    .tab:nth-child(2) .tab__button {
      justify-self: center;
      margin: 0 auto;
    }
    
    .tab:nth-child(3) .tab__button {
      justify-self: flex-end;
      margin: 0 0 0 auto;
    }
  
    .tab__content {
      text-align: justify;
      font-size: 1.5em;
      line-height: 1.25;
      flex: 1;
      transform-style: preserve-3d;
      pointer-events: all;
      background: var(--color-accent);
      padding: 1.5em 2em;
      border-radius: 
        var(--border-radius-small) 
        var(--border-radius-small)
        var(--border-radius) 
        var(--border-radius);
    }
    
    .skeleton {
      width: 100%;
      height: 1em;
      border-radius: --border-radius-small;
      background: var(--color-dark);
    }
    
    .skeleton + .skeleton {
      margin-top: 0.5em;
    }
    
    .bar {
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      margin: 0 0.1em;
      border-radius: --border-radius-small;
      background: var(--color-background);
      transition: all 260ms ease;
    }
    
    .tab--current .bar {
      background: var(--color-dark);
    }
    
    @keyframes swipe {
      0% {
        transform: translate3d(0, 0, 0);
        z-index: 2;
      }
      50% {
        transform: translate3d(80%, 0, 100px) rotate3d(0, 1, 0, -80deg);
        z-index: 2;
      }
      51% { z-index: -1; }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    
    @media only screen and (max-width: 400px) {
      .tabs {
        min-width: 100%;
      }
    }
  </style>
  