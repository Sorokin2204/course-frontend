import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';

import { Box } from '@mui/material';
import { Transition } from 'react-transition-group';
import { getTypeComponents } from '../../components/site/getTypeComponents';
import AnimateHeight from 'react-animate-height';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import Result from '../../components/site/Result';
import { setActiveChapter } from '../../redux/slices/app.slice';
import { getNameBusiness } from '../../redux/actions/data/getNameBusiness';
import { getTypeBusiness } from '../../redux/actions/data/getTypeBusiness';
import { getTypeOfSale } from '../../redux/actions/data/getTypeOfSale';
import { getWhereSale } from '../../redux/actions/data/getWhereSale';
import { upsertResult } from '../../redux/actions/user/upsertResult';
import { getResult } from '../../redux/actions/user/getResult';
import { NumericFormat } from 'react-number-format';
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const dataStepDefault = [
  { type: 'title', value: 'Сіз Бахтиярға күннің жұмыс жоспарын білу үшін хабарлама жібересіз.' },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Салем, Бахтияр</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: (
      <>
        Толығырақ айтар болсақ, негізгі қызметім кез келген бизнестің диагностикасын жасап , жүйелі түрде табысыңызды көтеріп қана қоймай компанияңызды масштабқа шығаруға көмектесемін.  Бұл  инструмент фирма қызметіндегі қателер мен кемшіліктерді анықтауға, шығындарды азайтуға/оңтайландыруға және
        жұмыс процесінің тиімділігін арттыруға көмектеседі.
      </>
    ),
  },
  {
    type: 'chat',
    value: <>Ал енді біз танысайық, сіз өзіңіз туралы аздап айтып берсеңіз!</>,
  },
  {
    type: 'inputs',
    title: <>Введи информацию о себе</>,
    fields: [
      {
        label: 'Пол',
        name: 'gender',
        type: 'radio',
        list: [
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ],
      },
      {
        label: 'Ваш возраст',
        name: 'year',
        type: 'number',
      },
      {
        label: 'Город',
        name: 'city',
        type: 'text',
      },
      {
        label: 'Почта',
        name: 'email',
        type: 'email',
      },
      {
        label: 'Опыт в бизнесе, лет',
        name: 'expInBussines',
        type: 'number',
      },
      {
        label: 'Название вашего бизнеса',
        name: 'nameBusiness',
        type: 'text',
      },
      {
        label: 'Существование вашего бизнеса, лет',
        name: 'yearBusiness',
        type: 'number',
      },
      {
        label: 'Выберите вид бизнеса',
        name: 'choiceBusiness',
        type: 'select',
        options: [],
      },
      {
        label: 'Выберите вид продажи',
        name: 'typeOfSale',
        type: 'select',
        options: [],
      },
      {
        label: 'Выберите где продаете',
        name: 'whereSale',
        type: 'select',
        options: [],
      },
    ],
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Ал енді сізбен жұмысқа кірісейік, бірақ әзірше бізбен байланыста қалу үшін   What’sApp чатқа  қосылыңыз.</>,
  },

  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Дайын!</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Ендеше, бастайық. Бұл платформа симулятор негізінде жасалған.  </>,
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Симулятор деген не?</>,
  },

  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: (
      <>
        Симулятор - бұл   виртуалды жасанды IT интелект , бұл инструмент сіздің кәсібіңізді жүелі түрде басқарып қана қоймай, сізді операционка-дан шығуыңызға көмектеседі(операционка-да жүрген адамның байуына уақыт жоқ).Инструментті еңгізу барысында сізді тек қажетті және өзекті құралдар жиынтығы
        мен практикалық тапсырмалар күтеді. Симуляторды сіз өзіңізге ыңғайлы уақытта қолдана аласыз.
      </>
    ),
  },
  {
    type: 'chat',
    value: <>Жұмысымызды бастайық. Ол үшін 1 айдағы компанияның орташа саудасын(оборот) жазыңыз. </>,
  },

  {
    chapter: 'Айналым(обороты)',
    type: 'inputs',
    title: <>Айналымды сандарға енгізіңіз</>,
    fields: [
      {
        label: 'Айналым',
        name: 'turnover',
        type: 'number',
      },
    ],
  },
  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Енді,  әр тауарыңыздың/қызметіңіздің үстіне үстіне орташа қанша пайыз(%) (наценка/маржа) қосып отырсыз?</>,
  },
  {
    type: 'chat',
    value: <>Егер сіз маржаның не екенін түсінбесеңіз немесе осы терминді егжей-тегжейлі зерттегіңіз келсе, осы тақырыптағы видеоны қараңыз.</>,
  },
  // {
  //   type: 'video',
  // },
  // {
  //
  //   type: 'inputs',
  //   title: <>Сіз өзіңіздің бағаңызды білесіз бе?</>,
  //   fields: [
  //     {
  //       label: 'Үстеме',
  //       name: 'margin',
  //       type: 'number',
  //     },
  //   ],
  // },
  {
    chapter: 'Үстеме(наценка)',
    type: 'inputs',
    title: <>Введи процент наценки</>,
    fields: [
      {
        label: 'Наценка, %',
        name: 'marginPercent',
        type: 'number',
      },
    ],
  },
  // {
  //   status: (form) => {
  //     const typeBusiness = parseInt(form.getValues('marginPercent'));
  //     if (typeBusiness < 15) {
  //       return 'bad';
  //     } else {
  //       return 'good';
  //     }
  //   },
  //   type: 'chat',
  //   valueStatus: (status) => {
  //     if (status == 'good') {
  //       return <>Жақсы!</>;
  //     } else {
  //       return (
  //         <>
  //           <b>Өте нашар.</b> <br /> <br /> Үстеме бағаны арттыру керек. Егер сізде көтерме сауда(оптом) болса, онда маржа 15%, ал бөлшек сауда(в розницу) болса, 30% және одан жоғары болуы керек.
  //         </>
  //       );
  //     }
  //   },
  // },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Ақпарат үшін рахмет. Мен оқуды жалғастырып, өз бизнесім туралы көбірек білгім келеді!</>,
  },

  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Бәрекелді! Жалғастырайық. Сіздің қоймаңызда қанша сумманың тауары бар(остаток товара на складе)?</>,
  },
  {
    type: 'chat',
    value: <>Терминді талдау, зерделеу(инструкция) және тауардың қалдығын есептеу қажет болса, видеоны қараңыз.</>,
  },
  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Егер сіз білсеңіз, қажетті ақпаратты енгізіңіз.</>,
  },
  {
    chapter: 'Тауардың қалдығы(остаток товара)',
    type: 'inputs',
    title: <>Тауардың қалдығы</>,
    fields: [
      {
        label: 'тауардың қалдығы',
        name: 'restOfGoods',
        type: 'number',
      },
    ],
  },
  // {
  //   status: (form) => {
  //     const restOfGoodsValue = parseInt(form.getValues('restOfGoods'));
  //     const formula = parseFloat((parseInt(form.getValues('turnover')) - (parseInt(form.getValues('turnover')) * parseInt(form.getValues('marginPercent'))) / 100) / 2).toFixed(2);
  //     if (formula < restOfGoodsValue) {
  //       return 'bad';
  //     } else {
  //       return 'good';
  //     }
  //   },
  //   type: 'chat',
  //   valueStatus: (status) => {
  //     if (status == 'good') {
  //       return <>Өте жақсы нәтиже!</>;
  //     } else {
  //       return (
  //         <>Жағдайыңыз қиын екен. Себебі сіздің қоймаңыздағы тауардың саны  1 айда  сатылып жатқан тауардың санынан кемінде 2 есе төмен болуы керек ,яғни қазіргі жағдайда  сіз оборотыңызды кем дегенде 2-3  есе көтеруіңіз қажет.Бұл сұрақтың шешімін келесі инструментте нақты көрсететін боламыз.</>
  //       );
  //     }
  //   },
  // },

  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Бұл үшін қандай іс-шара қолдансам болады?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Поставщик/оптовиктерге қанша қарызсыз?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Егер осы тақырып бойынша сұрақтар туындаса, онда видеоны көріп шығыңыз.</>,
  },
  // {
  //   type: 'video',
  // },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Информацияны бекіту үшін видеоны қайта қараңыз</>,
  },

  {
    chapter: 'Оптовиктердің/поставщиктердің алдындағы қарыз(долг перед постащиками)',
    type: 'inputs',
    title: <>Жеткізушілер алдындағы қарыз</>,
    fields: [
      {
        label: 'Қарыз',
        name: 'duty',
        type: 'number',
      },
    ],
  },

  // {
  //   status: (form) => {
  //     const dutyValue = form.getValues('duty');
  //     const formula = (parseInt(form.getValues('restOfGoods')) * 0.4).toFixed(2);
  //     if (dutyValue == 0) {
  //       return 'good';
  //     } else if (dutyValue > formula) {
  //       return 'bad';
  //     } else {
  //       return 'normal';
  //     }
  //   },
  //   type: 'chat',
  //   valueStatus: (status) => {
  //     if (status == 'good') {
  //       return <>Тамаша!</>;
  //     } else if (status == 'bad') {
  //       return <>Бұл жаман(</>;
  //     } else {
  //       return <>Керемет жұмыс, жарайсың! Барлығы қалыпты.</>;
  //     }
  //   },
  // },

  {
    type: 'chat',
    value: <>Келесі сұрақ. Сіз айына рекламаға қанша ақша жұмсайсыз?  Осы тақырыптағы видеоны көрейік</>,
  },
  // {
  //   type: 'video',
  // },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Өте қызықты видео. Рахмет!</>,
  },

  {
    chapter: 'Маркетинг',
    type: 'inputs',
    title: <>Маркетинг пен жарнамаға айына қанша ақша жұмсайтыныңызды жазыңыз</>,
    fields: [
      {
        label: 'Сомасы',
        name: 'marketing',
        type: 'number',
      },
    ],
  },

  {
    status: (form) => {
      const marketingValue = parseInt(form.getValues('marketing'));
      const turnoverValue = parseInt(form.getValues('turnover'));
      const marginPercentValue = parseInt(form.getValues('marginPercent'));

      const formula = (marketingValue / turnoverValue).toFixed(2) * 100;
      const sumProductValue = turnoverValue - (turnoverValue * marginPercentValue) / 100;
      const dirtyValue = turnoverValue - (turnoverValue * (100 - marginPercentValue)) / 100 - marketingValue;
      form.setValue('marketingPercent', formula);
      form.setValue('dirty', dirtyValue);
      form.setValue('sumProduct', parseFloat(sumProductValue));
      if ((formula > 2 && formula < 3) || formula == 2 || formula == 3) {
        return 'normal';
      } else if (formula > 3) {
        return 'bad';
      } else {
        return 'very-bad';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'normal') {
        return <>Жақсы</>;
      } else if (status == 'bad') {
        return <>Тиімді емес маркетинг</>;
      } else {
        return <>Рекламаға кеткен қаражатыңыз өте төмен, Клиентіңізге сараң болған сайын, сіздің де пайдаңыз өте төмен болады!</>;
      }
    },
  },
  {
    type: 'chat',
    value: <>Видеоны тағы бір рет көрейік! Қайталау-ілімнің анасы! Енді сіз қателеспейсіз!</>,
  },
  // {
  //   type: 'video',
  // },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Қайта көргенде түсініктірек болды, рахмет</>,
  },

  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Сіздің тауардың өзіндік құны мен рекламаға кеткен шығындарды алып тастағандағы табысыңыз осы( грязная прибыль ) , бұл табысқа басқада шығындардың түрі кірмеген(Адм.расходы , зрп)</>,
  },
  {
    type: 'chat',
    value: <>Шығындар түрі:</>,
  },
  {
    type: 'chat',
    value: <>1) тұрақты шығындар(постоянные расходы)</>,
  },
  {
    type: 'chat',
    value: <>2) өзгермелі шығындар(переменные расходы)</>,
  },
  {
    type: 'chat',
    value: <>3) басқа шығындар(прочее)</>,
  },

  {
    type: 'inputs',
    title: <>Есептейік сізде қандай лас пайда бар?</>,
    fields: [
      {
        label: 'Тұрақты шығында',
        name: 'constFlow',
        type: 'number',
      },
      {
        label: 'Өзгермелі шығындар',
        name: 'varFlow',
        type: 'number',
      },
      {
        label: 'Басқа шығындар',
        name: 'otherFlow',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const dirtyValue = parseInt(form.getValues('dirty'));
      const constFlowValue = parseInt(form.getValues('constFlow'));
      const varFlowValue = parseInt(form.getValues('varFlow'));
      const otherFlowValue = parseInt(form.getValues('otherFlow'));
      const flowValue = constFlowValue + varFlowValue + otherFlowValue;
      const cashValue = parseInt(dirtyValue - flowValue);
      const cashCommand = parseInt(cashValue * 0.3);
      const cashOwner = parseInt(cashValue - cashCommand);
      form.setValue('flow', flowValue);
      form.setValue('cash', cashValue);
      form.setValue('cashCommand', cashCommand);
      form.setValue('cashOwner', cashOwner);
      const dirtyBetween1 = parseInt(dirtyValue * 0.1);
      const dirtyBetween2 = parseInt(dirtyValue * 0.2);

      if (dirtyBetween1 > flowValue && flowValue < dirtyBetween2) {
        return 'good';
      } else {
        return 'bad';
      }
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'good') {
        return <>Нормально</>;
      } else {
        return <>Плохо</>;
      }
    },
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Шығыныңыз белгілі мөлшерден асып кетіпті. Проблеманы шешетін 3 жолы бар :</>,
  },
  {
    type: 'chat',
    value: <>1)оборотты көтеру</>,
  },
  {
    type: 'chat',
    value: <>2)наценкамен жұмыс істеу</>,
  },
  {
    type: 'chat',
    value: <>3)керек емес шығындарды анықтап ,алып тастау.</>,
  },

  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Келген табыстың барлық шығындардың алып тастағандағы компанияның табысы (бұл шығында жұмыскерлердің айлығы саналмайды)</>,
  },
  {
    type: 'chat',
    value: (
      <>
        Нәтижесінде:{' '}
        <ul>
          <li>Командаңызға берілетін айлық мөлшері:</li>
        </ul>
      </>
    ),
  },

  {
    chapter: 'Сіздің командаңыздың жалақысы',
    type: 'inputs',
    title: <>Сіздің командаңыздың жалақысы қандай?</>,
    fields: [
      {
        label: 'Саны',
        name: 'countPeople',
        type: 'number',
      },
      {
        label: 'Жалақыға арналған сумма',
        name: 'wage',
        type: 'number',
      },
    ],
  },
  {
    type: 'inputs',
    title: <>Бонустар</>,
    fields: [
      {
        label: 'Бір айдағы таланттар саны',
        name: 'countTalentsPeople',
        type: 'number',
      },
      {
        label: 'Тоқсан ішінде үздік нәтиже көрсеткен қызметкерлер саны',
        name: 'countKpiPeople',
        type: 'number',
      },
      {
        label: 'Бір жылдағы ең жақсы нәтижелер',
        name: 'countBestResultPeople',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const directSalaryValue = parseInt(form.getValues('cashCommand')) / 2 / parseInt(form.getValues('countPeople'));
      const talentPeopleSalaryValue = parseInt(form.getValues('cashCommand')) / 2 / 3 / parseInt(form.getValues('countTalentsPeople')) + directSalaryValue;
      const directBonusValue = (parseInt(form.getValues('cashCommand')) / 2 / 3 / parseInt(form.getValues('countKpiPeople'))) * 3;
      const talentPeopleSalaryYearValue = directBonusValue * 4;
      const netProfit = parseInt(form.getValues('cash')) * 0.7;
      const reinvest = netProfit * 0.7;
      const cashOut = netProfit * 0.3;

      form.setValue('directSalary', directSalaryValue);
      form.setValue('talentPeopleSalary', talentPeopleSalaryValue);
      form.setValue('directBonus', directBonusValue);
      form.setValue('talentPeopleSalaryYear', talentPeopleSalaryYearValue);
      form.setValue('netProfit', parseInt(netProfit.toFixed(2)));
      form.setValue('reinvest', parseInt(reinvest.toFixed(2)));
      form.setValue('cashOut', parseInt(cashOut.toFixed(2)));
      return 'normal';
    },
    type: 'chat',
    valueStatus: (status) => {
      if (status == 'normal') {
        return <>Нәтижеңіз жаман емес , біракта айтыла кететін ұсыныстарымыз бар . Толық білу үшін видеоны көріп щығыңыз.</>;
      }
    },
  },

  {
    chapter: 'Команда бонустары',
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: (
      <>
        <ul>
          <li>Үздік қызметкерлерге бонустар: 600.000 тг</li>
          <li>Тоқсан ішінде үздік нәтиже көрсеткен қызметкерлерге бонустар: 1.000.000 тг</li>
          <li>Жылдың үздік нәтижелері: 1.000.000 тг</li>
        </ul>
      </>
    ),
  },
  // {
  //   type: 'video',
  // },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Мен онымен жұмыс істеймін</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Сіздің ойыңызша компанияңыз өсу потологына жетті ма?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Бұл жағдайда қалған пайданың  30% компанияның өсуіне қайта салып, одан қалған 70% өз бақытыңызға жұмсаңыз!</>,
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Рахмет!</>,
  },
  {
    chapter: 'Таза пайда',
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Енді қорытындылайық</>,
  },
  {
    type: 'chapter-end',
  },
];

const getCheckupData = (form, isSecond = false) => {
  const turnoverValueSource = parseInt(form.getValues('turnover'));
  const restOfGoodsValue = parseInt(form.getValues('restOfGoods'));
  const turnoverValue = isSecond ? form.getValues('countPeople') * 5000000 : turnoverValueSource;
  const choiceBusinessValue = parseInt(form.getValues('choiceBusiness')?.margin);

  const recomendTurnover = turnoverValue;
  const recomendMarginPercent = choiceBusinessValue;
  const recomendSumProduct = turnoverValue - (turnoverValue * recomendMarginPercent) / 100;
  const recomendRestOfGoods = recomendSumProduct / 2;
  const recomendDuty = recomendRestOfGoods * 0.4;
  const recomendMarketingPercent = 'от 2.5% до 3%';
  const recomendMarketing = turnoverValue * (2.5 / 100);
  const recomendDirty = turnoverValue - recomendSumProduct - recomendMarketing;
  const recomendFlow = recomendDirty * 0.15;
  const recomendCash = recomendDirty - recomendFlow;
  const recomendCountPeople = turnoverValue / 5000000;
  const recomendWage = recomendCash * 0.15;
  const recomendCashOwner = recomendCash - recomendWage;

  let recomendSecondTurnover = 0;
  let recomendSecondMarginPercent = 0;
  let recomendSecondSumProduct = 0;
  let recomendSecondRestOfGoods = 0;
  let recomendSecondDuty = 0;
  let recomendSecondMarketingPercent = 0;
  let recomendSecondMarketing = 0;
  let recomendSecondDirty = 0;
  let recomendSecondFlow = 0;
  let recomendSecondCash = 0;
  let recomendSecondCountPeople = 0;
  let recomendSecondWage = 0;
  let recomendSecondCashOwner = 0;
  let isZeroCondition = restOfGoodsValue > recomendRestOfGoods;
  if (isZeroCondition) {
    recomendSecondTurnover = parseFloat((restOfGoodsValue / recomendRestOfGoods) * turnoverValueSource).toFixed(2);
    recomendSecondMarginPercent = choiceBusinessValue;
    recomendSecondSumProduct = recomendSecondTurnover - (recomendSecondTurnover * recomendSecondMarginPercent) / 100;
    recomendSecondRestOfGoods = recomendSecondSumProduct / 2;
    recomendSecondDuty = recomendSecondRestOfGoods * 0.4;
    recomendSecondMarketingPercent = 'от 2.5% до 3%';
    recomendSecondMarketing = recomendSecondTurnover * (2.5 / 100);
    recomendSecondDirty = recomendSecondTurnover - recomendSecondSumProduct - recomendSecondMarketing;
    recomendSecondFlow = recomendSecondDirty * 0.15;
    recomendSecondCash = recomendSecondDirty - recomendSecondFlow;
    recomendSecondCountPeople = recomendSecondTurnover / 5000000;
    recomendSecondWage = recomendSecondCash * 0.15;
    recomendSecondCashOwner = recomendSecondCash - recomendSecondWage;
  }
  const result = [
    {
      title: 'Айналым(оборот)',
      label: 'Сіздің айдағы айналымыңыз',
      labelTwo: 'Сізге ұсынылған айналым',
      name: 'turnover',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendTurnover).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondTurnover).toFixed(2) : 0;
      },
    },
    {
      title: 'Үстеме(наценка)',
      label: 'Сіздің үстеме бағаңыз',
      labelTwo: 'Сізге ұсынылған үстеме',
      name: 'marginPercent',
      recomend: (form) => {
        return parseFloat(recomendMarginPercent).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondMarginPercent).toFixed(2) : 0;
      },
    },
    {
      title: 'Сумма товара',
      label: 'Сіздің үстеме бағаңыз',
      labelTwo: 'Сізге ұсынылған үстеме',
      name: 'sumProduct',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendSumProduct).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondSumProduct).toFixed(2) : 0;
      },
    },
    {
      title: 'Тауардың қалдығы(остаток товара)',
      label: 'Сіздің тауар қалдығыңыз',
      labelTwo: 'Ұсынылған тауар қалдығы',
      name: 'restOfGoods',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendRestOfGoods).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondRestOfGoods).toFixed(2) : 0;
      },
    },
    {
      title: 'Оптовиктердің/поставщиктердің алдындағы қарыз(долг перед постащиками)',
      label: 'Сіздің қарызыңыз',
      labelTwo: 'Ұсынылған қарыз',
      name: 'duty',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendDuty).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondDuty).toFixed(2) : 0;
      },
    },
    {
      title: 'Маркетинг в проценте',
      label: 'Сіздің маркетингтік шығындарыңыз',
      labelTwo: 'Ұсынылған маркетингтік шығындар',
      name: 'marketingPercent',
      recomend: (form) => {
        return recomendMarketingPercent;
      },
      recomendSecond: (form) => {
        return isZeroCondition ? recomendMarketingPercent : 0;
      },
    },
    {
      title: 'Маркетинг в тенге',
      label: 'Сіздің маркетингтік шығындарыңыз',
      labelTwo: 'Ұсынылған маркетингтік шығындар',
      name: 'marketing',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendMarketing).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondMarketing).toFixed(2) : 0;
      },
    },
    {
      title: 'Грязная прибыль',
      label: 'Грязная прибыль',
      labelTwo: 'Ұсынылған маркетингтік шығындар',
      name: 'dirty',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendDirty).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondDirty).toFixed(2) : 0;
      },
    },
    {
      title: 'Расход',
      label: 'Ваш расход',
      labelTwo: 'Рекомендованный расход',
      name: 'flow',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendFlow).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondFlow).toFixed(2) : 0;
      },
    },
    {
      title: 'Кэш компании',
      label: 'Сіздің команданың жалақысы',
      labelTwo: 'Команданың ұсынылған жалақысы',
      name: 'cash',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendCash).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondCash).toFixed(2) : 0;
      },
    },

    {
      title: 'Команданын саны',
      label: 'Сіздің команданың жалақысы',
      labelTwo: 'Команданың ұсынылған жалақысы',
      name: 'countPeople',
      recomend: (form) => {
        return parseFloat(recomendCountPeople).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondCountPeople).toFixed(2) : 0;
      },
    },
    {
      title: 'Фонд оплата труда',
      label: 'Сіздің командалық бонустарыңыз',
      labelTwo: 'Команданың ұсынылған бонустары',
      name: 'wage',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendWage).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondWage).toFixed(2) : 0;
      },
    },
    {
      title: 'Кэш владелца',
      label: 'Сіздің командалық бонустарыңыз',
      labelTwo: 'Команданың ұсынылған бонустары',
      name: 'cashOwner',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendCashOwner).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondCashOwner).toFixed(2) : 0;
      },
    },
    {
      title: 'Команда бонустары',
      label: 'Сіздің командалық бонустарыңыз',
      labelTwo: 'Команданың ұсынылған бонустары',
      labelThird: 'Бонусы за месяц',
      labelFour: 'Бонасы за обучение за квартал ',
      labelFive: 'Бонус за год',
      name: 'cashCommand',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.15).toFixed(2);
      },
      recomendSecond: (form) => {
        return (parseInt(form.getValues('cash')) * 0.5).toFixed(2);
      },
      recomendThird: (form) => {
        return (parseInt(form.getValues('cash')) * 0.5 * 3).toFixed(2);
      },
      recomendFour: (form) => {
        return (parseInt(form.getValues('cash')) * 0.05 * 12).toFixed(2);
      },
    },
    {
      title: 'Таза пайда',
      label: 'Сіздің таза пайдаңыз',
      labelTwo: 'Болу керек таза пайда',
      name: 'netProfit',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.7).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? (parseInt(form.getValues('cash')) * 0.7).toFixed(2) : 0;
      },
    },
    {
      title: 'Реинвест',
      label: 'Ваш Реинвест',
      labelTwo: 'Рекомендованный реинвест',
      name: 'reinvest',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.7 * 0.7).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? (parseInt(form.getValues('cash')) * 0.7 * 0.7).toFixed(2) : 0;
      },
    },
    {
      title: 'Кэшаут',
      label: 'Ваш кэшаут',
      labelTwo: 'Рекомендованный кэшаут',
      name: 'cashOut',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.7 * 0.3).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? (parseInt(form.getValues('cash')) * 0.7 * 0.3).toFixed(2) : 0;
      },
    },
  ];
  return result;
};

const CourseStart = () => {
  const {
    activeChapter,
    getNameBusiness: { data: getNameBusinessData },
    getTypeBusiness: { data: getTypeBusinessData },
    getTypeOfSale: { data: getTypeOfSaleData },
    getWhereSale: { data: getWhereSaleData },
  } = useSelector((state) => state.app);
  const {
    authUser: { data: auth },
    getResult: { data: getResultData, loading: getResultLoading },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const pageForm = useForm();
  console.log(pageForm.getValues());
  const [dataResult, setDataResult] = useState({});
  const [dataStep, setDataStep] = useState(dataStepDefault);
  const calcData = () => {
    // const turnover = pageForm.getValues('turnover');
    // const margin = pageForm.getValues('margin');
    // const marginPercent = pageForm.getValues('marginPercent');
    // const restOfGoods = pageForm.getValues('restOfGoods');
    // const duty = pageForm.getValues('duty');
    // const marketing = pageForm.getValues('marketing');
    // const marketingPercent = pageForm.getValues('marketingPercent');
    // const dirty = pageForm.getValues('dirty');
    // const constFlow = pageForm.getValues('constFlow');
    // const varFlow = pageForm.getValues('varFlow');
    // const otherFlow = pageForm.getValues('otherFlow');
    // const flow = pageForm.getValues('flow');
    // const cash = pageForm.getValues('cash');
    // const cashCommand = pageForm.getValues('cashCommand');
    // const countPeople = pageForm.getValues('countPeople');
    // const directSalary = pageForm.getValues('directSalary');
    // const countTalentsPeople = pageForm.getValues('countTalentsPeople');
    // const talentPeopleSalary = pageForm.getValues('talentPeopleSalary');
    // const countKpiPeople = pageForm.getValues('countKpiPeople');
    // const directBonus = pageForm.getValues('directBonus');
    // const talentPeopleSalaryYear = pageForm.getValues('talentPeopleSalaryYear');
    // const netProfit = pageForm.getValues('netProfit');
    // const reinvest = pageForm.getValues('reinvest');
    // const cashOut = pageForm.getValues('cashOut');
    return pageForm.getValues();
  };
  const myRef = useRef(null);
  console.log(pageForm.formState.errors);
  const [activeStep, setActiveStep] = useState(2);
  const activeStepRef = useRef();
  const activeChapterRef = useRef();
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);
  useEffect(() => {
    activeChapterRef.current = activeChapter;
  }, [activeChapter]);
  const onSubmit = () => {
    setTimeout(() => {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
    let nextStep = activeStep + 1;
    if (dataStep[nextStep]?.chapter) {
      nextStep++;
      dispatch(setActiveChapter(activeChapter + 1));
    }

    setActiveStep(nextStep);
    calcData();
  };
  useEffect(() => {
    dispatch(getResult(auth?.id));
    dispatch(getNameBusiness());
    dispatch(getTypeBusiness());
    dispatch(getTypeOfSale());
    dispatch(getWhereSale());
    window.addEventListener('unload', resetPage);

    return () => {
      window.removeEventListener('unload', resetPage);
      resetPage();
    };
  }, []);

  const resetPage = () => {
    dispatch(
      upsertResult({
        userId: auth?.id,
        step: activeStepRef.current,
        chapter: activeChapterRef.current,
        dataCourse: pageForm.getValues(),
      }),
    );
  };
  useEffect(() => {
    if (getResultData) {
      pageForm.reset(JSON.parse(getResultData?.data));
      dispatch(setActiveChapter(getResultData?.chapter));
      setActiveStep(getResultData?.step);
      setTimeout(() => {
        myRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [getResultData]);
  useEffect(() => {
    if (getNameBusinessData && getTypeBusinessData && getTypeOfSaleData && getWhereSaleData) {
      let dataStepUpdate = dataStep;
      dataStepUpdate[4].fields[7].options = getTypeBusinessData?.map((itemTypeBusiness) => ({
        label: itemTypeBusiness?.name,
        options: getNameBusinessData?.filter((itemNameBusiness) => itemNameBusiness?.typeBusinessId == itemTypeBusiness?.id)?.map((itemNameBusiness) => ({ margin: itemTypeBusiness?.margin, value: itemNameBusiness?.id, label: itemNameBusiness?.name })),
      }));
      dataStepUpdate[4].fields[8].options = getTypeOfSaleData?.map((itemTypeOfSale) => ({ value: itemTypeOfSale?.id, label: itemTypeOfSale?.name }));
      dataStepUpdate[4].fields[9].options = [
        { label: 'Онлайн', options: getWhereSaleData?.filter((itemWhereSale) => itemWhereSale?.isOnline)?.map((itemWhereSale) => ({ label: itemWhereSale?.name, value: itemWhereSale?.id })) },
        { label: 'Оффлайн', options: getWhereSaleData?.filter((itemWhereSale) => !itemWhereSale?.isOnline)?.map((itemWhereSale) => ({ label: itemWhereSale?.name, value: itemWhereSale?.id })) },
      ];
      setDataStep(dataStepUpdate);
      console.log(dataStepUpdate);
    }
  }, [getNameBusinessData, getTypeBusinessData, getTypeOfSaleData, getWhereSaleData]);
  console.log(activeStep);
  return (
    <>
      {!getResultLoading && (
        <Box sx={{ paddingBottom: '44px', marginBottom: '40px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ fontWeight: '600', fontSize: '24px', marginRight: '25px' }}>Аудит бизнеса</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#4282E1' }}>
              <img src="/img/clock.svg" style={{ marginRight: '5px' }} />
              150 мин.
            </Box>
          </Box>
          <Box sx={{ marginTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #E0E0E0', marginBottom: '24px' }}>
            Сәлем Айбек! Мен-Бақтияр Өсербекұлы, 20–жылдық тәжірибесі бар бизнес-практик қарапайым тілмен айтқанда бизнестің механигімін және жүйелі басқарудан жетекшімін. Сізді біздің платформада қарсы алғаныма қуаныштымын!
          </Box>
          {dataStep?.map((item, itemIndex) => {
            return (
              <div
                style={{
                  opacity: itemIndex < activeStep ? '1' : '0',
                  transition: 'all .4s',
                  transitionDelay: '.4s',
                  visibility: itemIndex < activeStep ? 'visible' : 'hidden',
                }}>
                <AnimateHeight duration={400} height={itemIndex < activeStep ? 'auto' : 0}>
                  <div> {getTypeComponents(item, pageForm, itemIndex < activeStep, activeStep, itemIndex)}</div>
                </AnimateHeight>
              </div>
            );
          })}
          {dataStep?.length > activeStep && (
            <Box sx={{ width: 'calc(100% - 375px)', position: 'fixed', padding: '0 28px 35px 28px', bottom: '0px', right: '0px', background: '#FBFBFB' }}>
              <button style={{ border: 'none', color: '#fff', background: '#4282E1', borderRadius: '5px', height: '44px', width: '100%', fontSize: '16px', cursor: 'pointer' }} onClick={pageForm.handleSubmit(onSubmit)}>
                Жалғастыру
              </button>
            </Box>
          )}

          {/* <Result {...calcData()} /> */}
          {activeStep == dataStep?.length && (
            <>
              <Box sx={{ fontSize: '24px', marginTop: '30px', fontWeight: '600', textAlign: 'center' }}>Оптимизация</Box>
              {getCheckupData(pageForm)?.map((itemResult) => (
                <Box sx={{ marginTop: '40px', padding: '24px 24px 24px 50px', borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)', position: 'relative' }}>
                  <Box>
                    <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> {itemResult?.title}</Box>
                    <Box sx={{ position: 'absolute', top: '15px', left: '22px', height: 'calc(100% - 30px)', width: '4px', borderRadius: '4px', background: '#4282E1' }}></Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '25px' }}>
                    <label class={clsx('input-wrap')}>
                      <div className="input-lable input-label-required">{itemResult?.label}</div>
                      <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.name == 'cashCommand' ? 0 : pageForm.getValues(itemResult?.name)} />
                    </label>
                    <Box>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>

                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomend(pageForm)} />
                      </label>
                      {itemResult?.name == 'cashCommand' && (
                        <>
                          {' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelThird}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                          </label>
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFour}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendThird(pageForm)} />
                          </label>{' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFive}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendFour(pageForm)} />
                          </label>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: '25px', height: '57px', background: 'rgba(66, 130, 225, 0.15)', borderRadius: '6px' }}> </Box>
                </Box>
              ))}
              <Box sx={{ fontSize: '24px', marginTop: '30px', fontWeight: '600', textAlign: 'center' }}>Масштобирование</Box>
              {getCheckupData(pageForm, true)?.map((itemResult) => (
                <Box sx={{ marginTop: '40px', padding: '24px 24px 24px 50px', borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)', position: 'relative' }}>
                  <Box>
                    <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> {itemResult?.title}</Box>
                    <Box sx={{ position: 'absolute', top: '15px', left: '22px', height: 'calc(100% - 30px)', width: '4px', borderRadius: '4px', background: '#4282E1' }}></Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '25px' }}>
                    <label class={clsx('input-wrap')}>
                      <div className="input-lable input-label-required">{itemResult?.label}</div>
                      <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.name == 'cashCommand' ? 0 : pageForm.getValues(itemResult?.name)} />
                    </label>
                    <Box>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>

                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomend(pageForm)} />
                      </label>
                      {itemResult?.name == 'cashCommand' && (
                        <>
                          {' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelThird}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                          </label>
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFour}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendThird(pageForm)} />
                          </label>{' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFive}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendFour(pageForm)} />
                          </label>
                        </>
                      )}
                    </Box>
                    <Box>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>

                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                      </label>
                      {itemResult?.name == 'cashCommand' && (
                        <>
                          {' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelThird}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                          </label>
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFour}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendThird(pageForm)} />
                          </label>{' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFive}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendFour(pageForm)} />
                          </label>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: '25px', height: '57px', background: 'rgba(66, 130, 225, 0.15)', borderRadius: '6px' }}> </Box>
                </Box>
              ))}
            </>
          )}
          <Box ref={myRef}></Box>
        </Box>
      )}
    </>
  );
};

export default CourseStart;
