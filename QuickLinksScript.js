const drawer = document.querySelector('#Links-Drawer');
const WebsiteUL = document.querySelector('#WebsiteLinks');
const KnowledgeBaseUL = document.querySelector('#KnowledgeBaseList');

const WebsiteList = [
  {
    name: 'Saving Tips',
    url: 'https://www.prepaypower.ie/saving-energy',
  },
  {
    name: 'Payment Options & Rates',
    url: 'https://www.prepaypower.ie/why-switch/pricing/rates',
  },
  {
    name: 'App Support',
    url: 'https://www.prepaypower.ie/support/app-support',
  },
  {
    name: 'PSO Levy Refund',
    url: 'https://www.prepaypower.ie/support/pso-levy-refund',
  },
  {
    name: 'Estimate Annual Bill FAQs',
    url: 'https://www.prepaypower.ie/why-switch/pricing/estimated-annual-bill-faqs',
  },
];

const KnowledgeBaseList = [
  {
    name: ' Customer Vend Request    ',
    url: 'https://yuno.shelf-eu.com/read/1607973f-e287-4491-beb2-9246113205f3/',
  },
  {
    name: 'Emergency Credit',
    url: 'https://yuno.shelf-eu.com/read/0f1e971d-1b5f-4916-a75c-79aff315d6fe/',
  },
  {
    name: '  Retention Training',
    url: 'https://yuno.shelf-eu.com/read/f750a7cb-709e-4043-af14-a75b87c2362f/',
  },
  {
    name: 'PSO Levy Refund',
    url: 'https://yuno.shelf-eu.com/read/17cac829-8853-4964-8970-88c3a43223b4/',
  },
  {
    name: 'Estimate Annual Bill FAQs',
    url: 'https://yuno.shelf-eu.com/read/6c00e924-ceee-4166-ae83-77c6bc54ec47/',
  },
];

WebsiteList.forEach((e) => {
  const link = document.createElement('a');
  link.classList.add('w-full');
  link.setAttribute('href', e.url);
  link.setAttribute('target', 'Blank');
  link.innerHTML = ` <li class="pl-4  list-none border-b-2  border-transparent hover:border-slate-200 website-list-item">${e.name}</li>`;
  WebsiteUL.appendChild(link);
});

KnowledgeBaseList.forEach((e) => {
  const link = document.createElement('a');
  link.classList.add('w-full');
  link.setAttribute('href', e.url);
  link.setAttribute('target', 'Blank');
  link.innerHTML = ` <li class="pl-4 list-none	border-b-2  border-transparent hover:border-slate-200 kb-list-item">${e.name}</li>`;
  KnowledgeBaseUL.appendChild(link);
});
