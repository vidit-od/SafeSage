-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PosttoTag" (
    "id" SERIAL NOT NULL,
    "postID" TEXT NOT NULL,
    "tagID" TEXT NOT NULL,

    CONSTRAINT "PosttoTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "postindx" ON "PosttoTag"("postID");

-- CreateIndex
CREATE INDEX "tagindx" ON "PosttoTag"("tagID");

-- CreateIndex
CREATE UNIQUE INDEX "PosttoTag_postID_tagID_key" ON "PosttoTag"("postID", "tagID");

-- AddForeignKey
ALTER TABLE "PosttoTag" ADD CONSTRAINT "PosttoTag_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosttoTag" ADD CONSTRAINT "PosttoTag_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
