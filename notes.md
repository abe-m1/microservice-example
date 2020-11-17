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

start skaffold:
skaffold dev

run ingress-nginx
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml
