## Criando o arquivo .env

Dentro da pasta `backend`, crie um arquivo chamado:

```text
backend/.env
```

### Estrutura do arquivo

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/atlantis"
PORT=3001
```

### Exemplo

Se o seu usuário do MySQL for:

```text
root
```

e a senha for:

```text
123456
```

o arquivo ficará:

```env
DATABASE_URL="mysql://root:123456@localhost:3306/atlantis"
PORT=3001
```

### Exemplo com caracteres especiais

Caso a senha contenha caracteres especiais, eles devem ser codificados na URL.

Exemplo:

Senha:

```text
TusckAct4$
```

Arquivo `.env`:

```env
DATABASE_URL="mysql://root:TusckAct4%24@localhost:3306/atlantis"
PORT=3001
```

Onde:

```text
$  -> %24
@  -> %40
#  -> %23
```

### Arquivo .env.example

O projeto também pode conter um arquivo de exemplo:

```text
backend/.env.example
```

Conteúdo:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/atlantis"
PORT=3001
```

Para utilizar:

1. Copie o arquivo:

```bash
cp .env.example .env
```

Ou no Windows:

```powershell
copy .env.example .env
```

2. Altere `SUA_SENHA` para a senha do seu MySQL.

3. Salve o arquivo e execute:

```bash
npx prisma generate
npx prisma db push
npm run dev
```
