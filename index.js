class Tab {
  constructor(tabArray, config) {
    this.container = document.createElement('div');
    this.config = config;
    this.tabButtons = this._createTabButton(tabArray);
    this.tabContent = this._createTabContent(tabArray);
    this._lastOpenedTab();
    this._handleTabClick();
    this.container.append(this.tabButtons, this.tabContent);
    return this.container;
  }

  _createTabButton(tabArray) {
    const buttonContainer = document.createElement('div');
    tabArray.forEach(element => {
      buttonContainer.appendChild(this._createButton({name: element.tabName, id: element.tabId}));
    });
    return buttonContainer;
  }

  _createButton(buttonObj) {
    const button = document.createElement('button');
    button.textContent = buttonObj.name;
    button.id = buttonObj.id;
    button.onclick = () => {
      const customEvent = new CustomEvent('change-tab', {detail: {id: button.id}});
      this.tabButtons.dispatchEvent(customEvent);
    };
    return button;
  }

  _createTabContent(tabArray) {
    const tabContent = document.createElement('div');
    tabArray.forEach(element => {
      tabContent.appendChild(this._createTabPanel({id: element.tabId, content: element.tabContent}));
    });
    return tabContent;
  }

  _createTabPanel(contentObj) {
    const tabPanel = document.createElement('div');
    tabPanel.classList.add('tabContent');
    tabPanel.style.display = 'none';
    tabPanel.id = contentObj.id;
    tabPanel.innerHTML = contentObj.content;
    return tabPanel;
  }

  _handleTabClick() {
    this.tabButtons.addEventListener('change-tab', (event) => {
      event.stopPropagation();
      const children = this.tabContent.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      this.tabContent.querySelector(`#${event.detail.id}`).style.display = 'block';
    });
  }

  _lastOpenedTab() {
    if (!this.config) {
      this.tabContent.firstChild.style.display = 'block';
      return;
    }
    this.tabContent.querySelector(`#${this.config.lastTab}`).style.display = 'block';
  }
}

const tabArray = [
  {tabName: 'Tab 1', tabId: 'tab-1', tabContent: 'this is tab 1'},
  {tabName: 'Tab 2', tabId: 'tab-2', tabContent: 'this is tab 2'},
  {tabName: 'Tab 3', tabId: 'tab-3', tabContent: 'this is tab 3'},
  {tabName: 'Custom Tab', tabId: 'tab-4', tabContent: 'this is a custom tab'}
];

const config = {
  lastTab: 'tab-2'
};

const tab = new Tab(tabArray, config);
document.getElementById('container').append(tab);
