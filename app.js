'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
function closeMenu() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mainNav.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

function setupTabs(selector, select) {
  const tabs = Array.from(document.querySelectorAll(selector));
  function activate(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      item.classList.toggle('active', active);
    });
    select(tab);
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        activate(tabs[next], true);
      }
    });
  });
  activate(tabs[0]);
}

setupTabs('.layer-tab', tab => {
  document.querySelectorAll('.layer-panel').forEach(panel => {
    panel.hidden = panel.id !== tab.getAttribute('aria-controls');
  });
});
const mobileQuery = window.matchMedia('(max-width: 640px)');
function updateOrientation() {
  document.querySelector('.layer-tabs').setAttribute('aria-orientation', mobileQuery.matches ? 'horizontal' : 'vertical');
}
mobileQuery.addEventListener('change', updateOrientation);
updateOrientation();

const controlResults = {
  lr: { name: 'Logistic regression', amf: [0.951, 0.996], ass: [0.888, 0.949] },
  rf: { name: 'Random forest', amf: [0.961, 0.986], ass: [0.814, 0.964] },
  mlp: { name: 'Multilayer perceptron', amf: [0.980, 0.991], ass: [0.901, 0.906] }
};
function renderResults(modelKey) {
  const model = controlResults[modelKey];
  const metrics = [
    { abbr: 'DF', label: 'Data fairness', scores: [0.692, 0.988] },
    { abbr: 'FDS', label: 'Feature similarity', scores: [0.837, 0.952] },
    { abbr: 'AMF', label: 'Model fairness', scores: model.amf },
    { abbr: 'ASS', label: 'Attribution similarity', scores: model.ass }
  ];
  const chart = document.querySelector('#validation-chart');
  chart.replaceChildren();
  metrics.forEach(metric => {
    const cell = document.createElement('div');
    cell.className = 'chart-cell';
    const heading = document.createElement('div');
    heading.className = 'chart-metric';
    const abbr = document.createElement('strong');
    abbr.textContent = metric.abbr;
    const label = document.createElement('span');
    label.textContent = metric.label;
    heading.append(abbr, label);
    cell.append(heading);
    metric.scores.forEach((score, index) => {
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.setAttribute('role', 'img');
      row.setAttribute('aria-label', `${metric.abbr}, ${index === 0 ? 'positive' : 'negative'} control: ${score.toFixed(3)}`);
      const track = document.createElement('div');
      track.className = 'bar-track';
      track.setAttribute('aria-hidden', 'true');
      const fill = document.createElement('span');
      fill.className = `bar-fill ${index === 0 ? 'terracotta' : 'green'}`;
      fill.style.width = `${score * 100}%`;
      track.append(fill);
      const value = document.createElement('span');
      value.className = 'bar-value';
      value.textContent = score.toFixed(3);
      value.setAttribute('aria-hidden', 'true');
      row.append(track, value);
      cell.append(row);
    });
    const axis = document.createElement('div');
    axis.className = 'bar-axis';
    axis.setAttribute('aria-hidden', 'true');
    ['0', '1'].forEach(text => {
      const label = document.createElement('span');
      label.textContent = text;
      axis.append(label);
    });
    cell.append(axis);
    chart.append(cell);
  });
  chart.setAttribute('aria-label', `Semi-synthetic validation scores for ${model.name}`);
}
document.querySelector('#model-select').addEventListener('change', event => renderResults(event.target.value));
renderResults('lr');

const codeSnippets = {
  setup: {
    text: '# Requires authorised repository access\ngit clone https://github.com/katsiaryna-bahamazava/xfairmed-toolkit.git\ncd xfairmed-toolkit\n\n# Install in your Python environment\npython -m pip install -e .',
    note: 'Python 3.10 or newer. Install from a local checkout with your authorised GitHub account.'
  },
  study: {
    text: '# From the repository root, after installation\n# Replace the CSV path with your prepared cohort\npython studies/tcga_brca_model_agnostic_fairness/scripts/run_tcga_brca_paper.py --input path/to/prepared_cohort.csv --results-dir results/tcga_audit',
    note: 'Prepare the cohort using the study scripts first. Raw clinical data are not bundled. The study produces tables and partial EXL / XCFS outputs.'
  }
};
let activeCode = 'setup';
setupTabs('.code-header [role="tab"]', tab => {
  activeCode = tab.dataset.code;
  document.querySelector('#code-text').textContent = codeSnippets[activeCode].text;
  document.querySelector('#code-note').textContent = codeSnippets[activeCode].note;
  document.querySelector('#code-panel').setAttribute('aria-labelledby', tab.id);
});
let copyReset;
document.querySelector('#copy-code').addEventListener('click', async () => {
  const label = document.querySelector('#copy-code span');
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(codeSnippets[activeCode].text);
    label.textContent = 'Copied';
    status.textContent = 'Commands copied to clipboard.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#code-text'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    label.textContent = 'Selected';
    status.textContent = 'Copy is unavailable here. Commands selected; press Control C or Command C to copy.';
  }
  clearTimeout(copyReset);
  copyReset = setTimeout(() => { label.textContent = 'Copy'; }, 2500);
});
