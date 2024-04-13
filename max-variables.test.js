const rule = require("./max-variables");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("max-variables", rule, {
  valid: [
    {
      code: `
      const a = 2;
      let b, c;
      for (let i = 0; i < a; i++) {
        const d = 10;
      }
      function e() {
        c = 100;
      }
      `,
      options: [5],
    },
  ],
  invalid: [
    {
      code: `const a = 1;
      let c;
      const e = () => {
        c = 100;
      }
      for (let i = 0; i < a; i++) {
        c = 10 + i;
      }
      `,
      options: [3],
      errors: [
        {
          messageId: "tooManyVariables",
        },
      ],
    },
  ],
});
