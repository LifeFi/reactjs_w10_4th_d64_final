import { PrismaClient } from "@prisma/client";

// declare global : ts 에서 전역변수 선언할 때 사용
declare global {
  var db: PrismaClient | undefined;
}

// dev 서버리스 환경에서, 매번 새로운 클라이언트 만들지 않도록 하기 위함.
// sqlite 에서도 의미가 있는지는 체크 필요
const db = global.db || new PrismaClient();
// 쿼리시 콘솔에 로그 남기는 옵션
// const db = global.db || new PrismaClient({log: ["query"]});
// const db = new PrismaClient();

// 프로덕션에서는 인스턴스 재사용 안하는 것으로 => 더 견고한 환경 선호?
// [ 질문 ] 서버리스 함수, 프로덕션에서도, 인스턴스 재사용하는 것이 유리한 것 아닌가?
if (process.env.NODE_ENV === "development") global.db = db;

export default db;
