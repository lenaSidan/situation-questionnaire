const introScreen = document.getElementById("intro-screen");
const questionScreen = document.getElementById("question-screen");
const finishScreen = document.getElementById("finish-screen");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

const createPdfButton = document.getElementById("create-pdf-button");
const sharePdfButton = document.getElementById("share-pdf-button");

const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-button");

const detailBlock = document.getElementById("detail-block");
const detailAnswer = document.getElementById("detail-answer");

/* ========================================
   ВОПРОСЫ
   Сейчас вопросы 12–38 закомментированы
   для быстрого тестирования.
======================================== */

const questions = [
  "Я чувствую себя виноватой(ым). Меня терзают угрызения совести.",

  "Я чувствую себя неуверенно. Я сомневаюсь, вправе ли я судить, и ориентируюсь на чужое мнение.",

  "Я чувствую себя задетой(ым), гневной(ым), подозрительной(ым), ревнивой(ым), мстительной(ым).",

  "Я чувствую себя не особенно тронутой(ым) ситуацией, так как постоянно витаю мыслями где-то в другом месте.",

  "Я чувствую себя раздраженной(ым) отсутствием порядка, грязной(ым), мне противно, мне необходима чистота.",

  "Я чувствую себя брошенной(ым) на произвол судьбы, несправедливо обиженной(ым) ею.",

  "Я чувствую себя вынужденной(ым) навязать свою волю.",

  "Я чувствую себя недостаточно стойкой(им). Я боюсь изменить самой(му) себе. Я хочу приняться за дело.",

  "Я чувствую себя меланхоличной(ым), грустной(ым), в депрессии, не зная, почему.",

  "Я чувствую себя неполноценной(ым), слабой(ым), менее способной(ым), чем другие люди.",

  "Я чувствую себя изможденным бойцом на посту, которому нельзя сдаваться.",

  "Я чувствую себя напуганной(ым). Я боюсь...",

  "Я чувствую себя слишком мягкой(им), слишком добросердечной(ым), я не могу сказать «нет».",

  "Я чувствую себя унылой(ым). Я не могу избавиться от прошлого (события или отношения).",

  "Я чувствую себя перегруженной(ым) своей ответственностью. Я просто не могу все это сделать!",

  "Я чувствую себя не принимающей(им) участие. Я отстранилась от всего этого.",

  "Я чувствую себя нерешительной, раздробленной, сомневающейся(имся). Действительно ли это то, чего я хочу?",

  "Я чувствую себя нетерпеливой(ым). Все мне кажется, слишком медленно происходящим.",

  "Я чувствую себя духовно нуждающейся(имся), мне необходимы участие и поддержка.",

  "Я чувствую себя клоуном, делающим хорошую мину при плохой игре.",

  "Я чувствую себя уставшей(им), хочу покоя.",

  "Я чувствую себя озадаченной(ым), так как постоянно совершаю одни и те же ошибки.",

  "Я чувствую себя измученной(ым) нежеланными мыслями и внутренними диалогами, от которых не могу избавиться.",

  "Я чувствую себя зажатой(ым) в тиски, отчаявшейся(имся), не знаю, что делать дальше.",

  "Я чувствую себя занятой(ым) на сто пятьдесят процентов.",

  "Я чувствую себя полностью шокированной(ым), я никак не могу справиться с этим ударом судьбы.",

  "Я чувствую себя выбитой(ым) из равновесия.",

  "Я чувствую себя обессиленной(ым), измученной(ым), истощенной(ым).",

  "Я чувствую себя рекордсменом, вынужденным постоянно тренироваться, ничего себе не позволять.",

  "Я чувствую себя лишенной(ым) надежды, покоренной(ым) судьбе.",

  "Я чувствую себя подверженной(ым) угрозе, меня одолевают страхи, с которыми я не могу справиться.",

  "Я чувствую себя недостаточно ценимой(ым) или любимой(ым), раненой(ым), разочарованной(ым), так как я ожидала большего признания или благодарности.",

  "Я чувствую себя так сильно погруженной(ым) в положение других людей, что практически, совершенно не воспринимаю свои собственные чувства и страхи.",

  "Я чувствую себя обескураженной(ым), настроенной(ым) скептически и пессимистически.",

  "Я чувствую себя как на бочке с порохом. Я больше не могу владеть собой.",

  "Я чувствую себя нервной(ым), слишком критичной(ым) или, наоборот, некритичной(ым), терпимой.",

  "Я чувствую себя внутренне вялой, лишенной(ым) энергии. У меня недостаточно сил, чтобы выполнить мое задание.",

  "Я чувствую себя в панике.",
];

/* ========================================
   СОСТОЯНИЕ АНКЕТЫ
======================================== */

let currentQuestion = 0;
let selectedAnswer = null;

const answers = [];
const detailAnswers = [];

/* ========================================
   НАЧАТЬ
======================================== */

startButton.addEventListener("click", () => {
  introScreen.hidden = true;
  questionScreen.hidden = false;

  showQuestion();
});

/* ========================================
   ПОКАЗАТЬ ТЕКУЩИЙ ВОПРОС
======================================== */

function showQuestion() {
  progress.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;

  questionText.textContent = questions[currentQuestion];

  selectedAnswer = answers[currentQuestion] ?? null;

  /* Восстанавливаем выбранный ответ */

  answerButtons.forEach((button) => {
    button.classList.remove("selected");

    if (Number(button.dataset.value) === selectedAnswer) {
      button.classList.add("selected");
    }
  });

  /* Назад нельзя на первом вопросе */

  backButton.disabled = currentQuestion === 0;

  /*
    Дополнительное поле вопроса №12.
    Когда вопросы 12–38 снова будут включены,
    №12 будет иметь индекс 11.
  */

  if (currentQuestion === 11) {
    detailBlock.hidden = false;

    detailAnswer.value = detailAnswers[currentQuestion] ?? "";
  } else {
    detailBlock.hidden = true;
  }

  /* Последний активный вопрос */

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "Завершить";
  } else {
    nextButton.textContent = "Далее";
  }
}

/* ========================================
   ВЫБОР ОТВЕТА
======================================== */

answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    answerButtons.forEach((item) => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedAnswer = Number(button.dataset.value);

    answers[currentQuestion] = selectedAnswer;
  });
});

/* ========================================
   УТОЧНЕНИЕ ВОПРОСА №12
======================================== */

detailAnswer.addEventListener("input", () => {
  detailAnswers[currentQuestion] = detailAnswer.value;
});

/* ========================================
   ДАЛЕЕ / ЗАВЕРШИТЬ
======================================== */

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) {
    alert("Пожалуйста, выберите ответ.");
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;

    showQuestion();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  /* Анкета завершена */

  questionScreen.hidden = true;
  finishScreen.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ========================================
   НАЗАД
======================================== */

backButton.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;

    showQuestion();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

/* ========================================
   КНОПКИ PDF
======================================== */

createPdfButton.addEventListener("click", () => {
  createPDF("download");
});

sharePdfButton.addEventListener("click", () => {
  createPDF("share");
});

/* ========================================
   СОЗДАНИЕ PDF
======================================== */

function createPDF(action) {
  if (typeof pdfMake === "undefined") {
    alert("Не удалось загрузить модуль PDF. Обновите страницу и попробуйте ещё раз.");

    return;
  }

  const documentDefinition = buildPdfDocument();

  const today = new Date();

  const fileDate = formatFileDate(today);

  const fileName = `anketa-${fileDate}.pdf`;

  const pdf = pdfMake.createPdf(documentDefinition);

  /*
    Скачать
  */

  if (action === "download") {
    pdf.download(fileName);
    return;
  }

  /*
    Поделиться
  */

  pdf.getBlob(async (blob) => {
    await sharePDF(blob, fileName);
  });
}

/* ========================================
   СОДЕРЖАНИЕ PDF
======================================== */

function buildPdfDocument() {
  const nameInput = document.getElementById("name");

  const personName = nameInput.value.trim() || "Не указано";

  const today = new Date();

  const formattedDate = today.toLocaleDateString("ru-RU");

  const content = [
    {
      text: "Анкета ситуации",
      style: "title",
    },

    {
      columns: [
        {
          text: [
            {
              text: "Имя или обозначение: ",
              bold: true,
            },

            personName,
          ],
        },

        {
          text: [
            {
              text: "Дата: ",
              bold: true,
            },

            formattedDate,
          ],

          alignment: "right",
        },
      ],

      style: "info",
    },

    {
      text: "",
      margin: [0, 0, 0, 8],
    },
  ];

  /* Добавляем активные вопросы */

  questions.forEach((question, index) => {
    const answer = answers[index] ?? "—";

    const questionBlock = [
      {
        text: [
          {
            text: `${index + 1}. `,
            bold: true,
          },

          question,
        ],

        style: "question",
      },

      {
        text: [
          {
            text: "Ответ: ",
            color: "#667680",
          },

          {
            text: String(answer),
            bold: true,
            color: "#4f6877",
          },
        ],

        margin: [0, 5, 0, 0],
      },
    ];

    /*
      Уточнение вопроса №12
    */

    if (index === 11 && detailAnswers[index]?.trim()) {
      questionBlock.push({
        text: [
          {
            text: "Уточнение: ",
            bold: true,
          },

          detailAnswers[index].trim(),
        ],

        style: "detail",
      });
    }

    content.push({
      stack: questionBlock,

      margin: [0, 0, 0, 11],

      unbreakable: true,
    });
  });

  return {
    pageSize: "A4",

    pageMargins: [42, 42, 42, 42],

    content: content,

    defaultStyle: {
      font: "Roboto",

      fontSize: 10.5,

      color: "#30343b",

      lineHeight: 1.25,
    },

    styles: {
      title: {
        fontSize: 22,

        bold: true,

        color: "#30343b",

        margin: [0, 0, 0, 18],
      },

      info: {
        fontSize: 10,

        color: "#626a73",

        margin: [0, 0, 0, 15],
      },

      question: {
        fontSize: 10.5,

        color: "#30343b",
      },

      detail: {
        fontSize: 9.5,

        color: "#626a73",

        margin: [0, 6, 0, 0],
      },
    },

    footer: function (currentPage, pageCount) {
      return {
        text: `${currentPage} / ${pageCount}`,

        alignment: "center",

        fontSize: 8,

        color: "#9aa2a8",

        margin: [0, 10, 0, 0],
      };
    },
  };
}

/* ========================================
   ПОДЕЛИТЬСЯ PDF
======================================== */

async function sharePDF(blob, fileName) {
  const file = new File([blob], fileName, {
    type: "application/pdf",
  });

  /*
    Проверяем, может ли телефон
    поделиться именно файлом.
  */

  const shareData = {
    files: [file],

    title: "Анкета ситуации",
  };

  const canShareFiles = navigator.share && (typeof navigator.canShare !== "function" || navigator.canShare(shareData));

  if (canShareFiles) {
    try {
      await navigator.share(shareData);

      return;
    } catch (error) {
      /*
        Если пользователь сам закрыл
        меню Поделиться, ничего не делаем.
      */

      if (error.name === "AbortError") {
        return;
      }

      console.error("Ошибка отправки PDF:", error);
    }
  }

  /*
    Запасной вариант:
    если браузер не умеет отправлять PDF,
    просто скачиваем его.
  */

  downloadBlob(blob, fileName);

  alert(
    "На этом устройстве нельзя напрямую поделиться PDF. Файл скачан, его можно отправить через WhatsApp как обычный документ.",
  );
}

/* ========================================
   СКАЧАТЬ BLOB
======================================== */

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

/* ========================================
   ДАТА ДЛЯ ИМЕНИ ФАЙЛА
======================================== */

function formatFileDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
