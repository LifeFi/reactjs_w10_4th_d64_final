import { PrismaClient } from "@prisma/client";
import { CL_BGYELLOW, CL_RESET, WHERE_FILE } from "./constants";
/* 
상황:
  dev 환경에서, 코드 수정시마다 db 인스턴스가 생성되어 메모리 누수가 우려된다.

프로덕션 환경:
  상관 없다. 코드 수정으로, db 인스턴스가 다시 생성될 일이 없기 때문.

⭐️ 따라서, 다음 작업은 수수하게 DEV 개발을 위함이다.

1. 목적: 인스턴스가 있으면 다시 생성하지 않도록 한다.
2. 방법: global 객체에 db 인스턴스를 저장하고, global 객체에 db 인스턴스가 없을 때만 생성한다.

3. ⭐️ development 환경일때만 global 객체를 생성한다.
  - 이유 : global 객체가 있으면, db 모듈을 import 하지 않고 바로 사용할 수 있기 때문에,
          유지 보수에서 어렵다.
  
4. dev든 production이든, db 는 모듈을 import 해서 사용한다.

[추가] 실제 경험
- dev 에서 실수로, db 를 import 하지 않고 사용한 파일이 있었다.
- dev 에서는 문제가 없다가, production 에서 db 를 찾을 수 없는 에러를 만났다.

*/

// declare global : ts 에서 전역변수 선언할 때 사용
declare global {
  var db: PrismaClient | undefined;
}

// sqlite 에서도 의미가 있는지는 체크 필요
const db = global.db || new PrismaClient();
// const db = global.db || new PrismaClient({ log: ["query"] });
console.log(
  `${CL_BGYELLOW}============================ @ ${WHERE_FILE} | mode:`,
  process.env.NODE_ENV,

  `${CL_RESET}`
);
console.log(
  `============================ @lib/db.ts | db exists:`,
  Boolean(db)
);

console.log(
  `============================ @lib/db.ts | global.db exists:`,
  Boolean(global.db)
);
// 쿼리시 콘솔에 로그 남기는 옵션
// => const db = global.db || new PrismaClient({log: ["query"]});

// 프로덕션에서는 global 객체 생성, 사용 안함.
if (process.env.NODE_ENV === "development") global.db = db;

export default db;
