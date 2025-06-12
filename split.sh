# split.sh  — run once per video
SRC=video.mp4
CHUNK=1048576        # 1 MB pieces (≈ 1 000 for 1 GB)
mkdir -p tmp

# 1.a  slice into raw chunks
dd if="$SRC" of=tmp/chunk bs=$CHUNK

# 1.b  encrypt every chunk with AES-CTR (key=32 random bytes)
KEY=$(openssl rand -hex 16)          # save this key!
for f in tmp/chunk*; do
  openssl enc -aes-128-ctr -K $KEY -iv 0 -in "$f" -out "${f}.enc"
done
