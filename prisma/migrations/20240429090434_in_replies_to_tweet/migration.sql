-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "inReplyToTweetId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_inReplyToTweetId_fkey" FOREIGN KEY ("inReplyToTweetId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
