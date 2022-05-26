FROM trufflesuite/ganache-cli:v6.12.2
RUN /bin/sh -c "apk add --no-cache bash"
ENV NODE_OPTIONS=--max-old-space-size=26620
ENTRYPOINT node /app/ganache-core.docker.cli.js \
    --db /ganache_data/chain-state.db \
    --chainId 57771 \
    --verbose \
    --host 0.0.0.0 \
    --g 0 \
    --l 99999999999 \
    --account="0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666,900000000000000000000000000000000000000000000000000000000000000" \
    --account="0xa01f808c3d5fd5acd9035a364fdb7507da9b5041b7fca26da3ad60368e8c13be,900000000000000000000000000000000000000000000000000000000000000" \
    --account="0xc83f0823371722d20185a5800d4b812c46ae230792cba8c1744cd28af28d1a95,900000000000000000000000000000000000000000000000000000000000000"
