# CalculaStReact

[![Quality Gate Status](https://sonar.sajermann.com/api/project_badges/measure?project=CalculaStReact&metric=alert_status&token=490d78cd98b929c242494fac23f32788411fd2b9)]()
[![Coverage](https://sonar.sajermann.com/api/project_badges/measure?project=CalculaStReact&metric=coverage&token=490d78cd98b929c242494fac23f32788411fd2b9)]()
[![Bugs](https://sonar.sajermann.com/api/project_badges/measure?project=CalculaStReact&metric=bugs&token=490d78cd98b929c242494fac23f32788411fd2b9)]()
[![Code Smells](https://sonar.sajermann.com/api/project_badges/measure?project=CalculaStReact&metric=code_smells&token=490d78cd98b929c242494fac23f32788411fd2b9)]()
[![Duplicated Lines (%)](https://sonar.sajermann.com/api/project_badges/measure?project=CalculaStReact&metric=duplicated_lines_density&token=490d78cd98b929c242494fac23f32788411fd2b9)]()

Projeto de Calcular a Substituição Tributária da mercadoria baseada na Origem/Destino, Ncm, etc

Esse projeto foi criado e aperfeiçoado ao longo dos anos que trabalhei como faturista, começou como uma planilha em excel e se transformou em um sistema robusto de cálculo trazendo as principais informações tributárias tentando ao máximo simular uma Danfe.

Fiz esse refactor pelo carinho que tenho com esse meu projeto, então apliquei as melhores práticas do Frontend que tenho conhecimento, algumas funções/jeito de cálculos eu poderia ter feito diferente, porém como faz tempo que não estou na área e não tenho ninguém para validar os cálculos, eu preferi deixar do jeito que está.

Tendo em mente o que foi anteriormente citado, leve em conta que os valores finais estarão desatualizados.

## Estrutura

 - Vite
 - Vitest
 - React
 - Typescript
 - Sonar
 - Material UI
 - Tailwind
 - Zustand
 - ReactQuery

## Recursos

### Criação de Simulação
O usuário pode criar, editar, atualizar e excluir quantas simulações ele desejar.

### Itens da Simulação
O usuário pode criar, editar, atualizar e excluir quantos itens ele desejar.

### Dashboard
O usuário tem acesso ao dashboard contendo informações de todas as simulações salvas.

### Temas
O usuário pode escolher entre o tema claro ou o tema escuro.

### Linguagem
O usuário pode escolher entre a língua portuguesa ou a língua inglesa. Vale notar que nem tudo está traduzido, como de costume em meus projetos novos eu vou adicionando a multi linguagem, mas com o progresso do CalculaSt percebi que muitos termos brasileiros eu não conseguiria traduzir e acabei deixando desse jeito.

Obs: Como eu fiz essa versão apenas para demonstração, ele não possui backend, sendo assim todos os dados estão mocados, e todos os dados salvos estarão no local storage.

## Demonstração

**Dashboard**
![Dashboard](https://lh3.googleusercontent.com/pw/AIL4fc_7xx7QvANSe6GVtsbJNFaLeyupnQv5YhJ-tTSoX1DymlXnf2yuQJTNDbSxkWF0eiGyc1OT0TtoH6XqPywBVgEU3I8jnYxS0p7HZKXWnK_qH4eLcLv_9ICyIu6aIB4iqIPBL_KqsKAqxnYST9qLV6iD=w1854-h916-s-no?authuser=0)

**Simulações Escuro**
![Simulações Escuro](https://lh3.googleusercontent.com/pw/AIL4fc9ziW6L2I9NTkDdiNodhEMG1klSJPUD8NHI4iOP4ZLAJSxy2YLGj0KViqGLhGVsCToTon1MOilvG9i91Dwvy3aLXx9zI9GmDfwJoqUuJCT_ChZ2dsM0sCduH6QE3YMCP3Yhd8NIzwxZK0M6Lv5ZkyXi=w1868-h909-s-no?authuser=0)

**Simulações Claro**
![Simulações Claro](https://lh3.googleusercontent.com/pw/AIL4fc8h7X48djX8ieiZJjO8RXVj_8uXNjDBM_iC4I3-4Lp_mE1sgNqJ26Jf4onzTel_YzYYYtckWuIKS6nImIDCVSAF76BwFnE3fEPCTQuS_oCRfUctpHtjyo7keRREfLa9nn0cVcbxoib1JpbUMpfGimMP=w1860-h919-s-no?authuser=0)

**Criar Item**
![Criar Item](https://lh3.googleusercontent.com/pw/AIL4fc8ratgCuFJK95gk1Sg5FbjGfsNpr28PSGF7rnrgNHGaNDYFy1qPWMe5jfnyizywdI3fxIHZSsaNXnDlNTPlsHqeM8L5UsHojkAd3uJ8mtVKSZoSIUibr-xdDiWq6rxbXwkm4K6UcZyrULqE26C8graW=w1865-h928-s-no?authuser=0)

**Atualizar Item**
![Atualizar Item](https://lh3.googleusercontent.com/pw/AIL4fc-FtTAcReT4IONevTLDpB9HVQOWgiNYWWKKa6EZ74ZsdByBOCNkpaFjhjoj90_CbsFRaUKV7WDvm968fGonyO1rW5YcJLlOA-zikcOK9l3opA01GVKbPLFL6the0U57Ju70QrDQkJY3x07c_v65Y8Xd=w1869-h929-s-no?authuser=0)

**Atualizar Simulação**
![Atualizar Simulação](https://lh3.googleusercontent.com/pw/AIL4fc_ST-kbgFiHL4mv28OCK_-vELBfYRxPSmJ324LhpVY9lil8Re2zyTL9KK7SxpSS2L7L5dz0wochScJ89n7-xnXjk06CGXbKeQQZU2JHBQd9TdhGW6Ypyx03Xe41Y8Hr4WaiK8pn5ECohSQHzInPY5IQ=w1860-h925-s-no?authuser=0)

