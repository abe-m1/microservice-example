auth module

packages:
@types/express
express
ts-node-dev
typescript

generate typescript file:
tsc --init

build docker image:
docker build -t <docker id>/auth .

when create kubernetes deployment, a service goes with it
