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

access host file
code /etc/hosts

create a secret (imperative command)(for testing)
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

get list of secrets
kubectl get secrets

port forwardiing (for temporary connection)
kubectl port-forward nats-depl-74dbf5cddd-gm4tg 4222:4222

when testing nats type in 'rs' to restart server in the terminal
