export type TaskTest = {
    type: 'htmlStatic' | 'htmlE2E' | 'js' | 'python';
    checks: Check[];
};

type Check =
    | {
          type: 'element_exists';
          selector: string;
          text: string;
      }
    | {
          type: 'interaction';
          action: 'click';
          target: string;
          result: {
              selector: string;
              text: string;
          };
      };
