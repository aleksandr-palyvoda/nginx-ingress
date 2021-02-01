![alt text](https://github.com/aleksandr-palyvoda/nginx-ingress/blob/master/user_service.png?raw=true)

### Запуск проекта
#### namespace:
myapp
#### команда установки БД из helm, вместе с файлом values.yaml:
helm install pg bitnami/postgresql -f db_values.yaml
#### команда миграции БД:
kubectl apply -f initdb.yml
- просто удалим старую таблицу, если осталась с предыдущего приложения, а все необходимое сделать приложение при подключении к БД. Это встроенный функционал модуля.
#### команда запуска манифестов кубернетеса:
kubectl apply -f secrets.yml -f configmaps.yml

kubectl apply -f app-deployment.yaml -f app-service.yaml -f app-ingress.yaml

kubectl apply -f auth-deployment.yaml -f auth-service.yaml -f auth-ingress.yaml

#### команда запуска тестов:
newman run tests/auth-test.postman_collection.json
