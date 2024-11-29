from environs import Env

env = Env()
env.read_env()  # read .env file, if it exists


class Settings:
    postgresql_uri = env.str("POSTGRESQL_URI", "postgresql://postgres:woskxn@10.3.93.242:5432/engine")
    async_postgresql_uri = env.str("ASYNC_POSTGRESQL_URI",
                                   "postgresql+asyncpg://postgres:woskxn@10.3.93.242:5432/engine")
    billing_service_url = env.str("BILLING_SERVICE_URL", "http://billing:8080")
    tsuru_api_url = env.str("TSURU_API_URL", "http://tsuru:8080")
    tsuru_username = env.str("TSURU_USERNAME", "admin")
    tsuru_password = env.str("TSURU_PASSWORD", "hihi")
    celery_broker_url = env.str("CELERY_BROKER_URL", "redis://localhost:6379")
    deploy_service_url = env.str("DEPLOY_SERVICE_URL", "http://localhost:8080")
    redis_url = env.str("REDIS_URL", "redis://localhost:6379")
    auth_userinfo_url = env.str("0AUTH_USERINFO", "https://dev-u67s63gaoytg80ad.us.auth0.com/userinfo")


settings = Settings()
