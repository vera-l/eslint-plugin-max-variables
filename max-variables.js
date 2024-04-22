module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ограничение по количеству переменных",
    },
    schema: [
      {
        type: "number",
        minimum: 1,
        maximum: 100,
      },
    ],
    messages: {
      tooManyVariables:
        'Этот код содержит "{{ number }}" переменных вместо разрешенных "{{ max }}"',
    },
  },
  create(context) {
    const maxVariablesNumber = context.options[0] || 20;
    let variablesCounter = 0;

    return {
      "Program:exit"(programNode) {
        if (variablesCounter > maxVariablesNumber) {
          context.report({
            programNode,
            loc: programNode.range,
            messageId: "tooManyVariables",
            data: {
              number: variablesCounter,
              max: maxVariablesNumber,
            },
          });
        }
      },
      VariableDeclarator(node) {
        if (
          node.parent.kind === "let" ||
          node.parent.kind === "var" ||
          node.parent.kind === "const"
        ) {
          variablesCounter++;
        }
      },
    };
  },
};
