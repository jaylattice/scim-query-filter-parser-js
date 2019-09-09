import { ids, utils } from "apg-lib";
import { Yard } from "./Yard";
import { traverse } from "./util";

// TODO: implement unicode string comparisons using
// String.prototype.localeCompare()

function pr(path: string[], data: any): boolean {
  return traverse(path, data) !== undefined;
}

const map = {
  pr
};

export function postfixAssertionOperator(
  state: ids.SEM_PRE | ids.SEM_POST,
  chars: number[],
  phraseIndex: number,
  phraseLength: number,
  yard: Yard
): ids.SEM_OK | ids.SEM_SKIP {
  switch (state) {
    case ids.SEM_PRE:
      break;

    case ids.SEM_POST:
      const op = utils.charsToString(chars, phraseIndex, phraseLength, yard);
      const fn = map[op as keyof typeof map];
      if (!fn) {
        throw new Error(
          `INVARIANT: No such postfix assertion operator \`${op}\`.`
        );
      }

      yard.tracks.postfixAssertionOperator.push(fn);
      break;
  }

  return ids.SEM_OK;
}
