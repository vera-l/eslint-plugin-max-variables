module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow using too many variables",
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
        'This code contains "{{ number }}" variables against the allowed "{{ max }}"',
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
