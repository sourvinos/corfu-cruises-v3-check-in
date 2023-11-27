import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class BooleanIconService {

    public getTrueIcon(): string {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAL5ElEQVR4nO2dWZBcZRXHf+f29CQhIRuLkkowPISQRQhJoJAgJJgCYbqnu2foCVjAg5bsVgFVAgqUAUURlVIImy8iWAWZgenu2aBSYAYESjQbEmMCVRIIhRgLE0yGZKa77/FhpjEVIn3v7bv0cn8v8/J955yp/7+/u30LhISEhISEhISEhISEhISENAoSdAFekO5MR4bHDZ9kqpyMaZyicLKIzkZ0iqhMVJgITGP0L8AQsEdgSEWHUPlYVXYKvIVhbi+q7JiUj+7s6ugqBvdfeUNdGOCigYsmR0aaz1PTWCGiy4EFQLPLaUaArcCgqKwvjD/48nMXP/cfl3P4Ts0aoDXXeqppGpcKnK+wFIj4XEJBYCMqLxYN8+mBZO5Nn/O7Qk0Z4MLO9PSmaP4SRK8UlWVB13MoCtsQfUJHmn870NH1YdD1WKUmDNCSTawUlZuAC4CmoOspQwFYB9zfl8q+GHQx5aheAygSyyViwPdROSvochyyWVV+0p/KPIOgQRdzJKrPAKPCd4jK7QpfDrocl3hDVe6pRiNUlQFac61zTdNYA6wMuhaP+IOqXNffltkadCElqsIA8d74UVqI3AJ8D/cf36qNAqIPG6J39CR69gVdTOAGiHenYir6CDAz6Fp8ZpeaxrX97d39QRYRmAGWr1/eNGnv1DuAOwEjqDoCRhF9cMJI83e7OrpGgiggEAPEe+MnaiHyNPCVIPJXGwobMCOr+tuf/bvfuX3/5cUzyaQWIm8Qiv8pAkvFKG5oybW2+p3bVwPEulPXKzwLTPUzb40wTUwjG+tO3exnUt8M0JJN3IroGj9z1iCC6C/i3al7/UvoMenOdOSTpsJDInq117nqCYXHh6bu/fbgisGCl3k8NUC6Mx052Jx/SpW0l3nqFYXOo/LRb3g5D8G74ViRA80jj4TiO0eg42A0/7CXOTz7hh4/LXUPcKNX8RuIJXMum2u8/fSOQS+Ce3IJiGcT16nKQ17EbmBu7Etlf+V2UNcNEM8kk2OPeuHdvruYiCb7krleN4O6aoCxN3ybgeluxg35lD1NsDibyu50K6Brv9Ilj10VHXu9G4rvHdMKsDbdmXbti6lrBphx/O77CF/v+sGZB5pHfuRWMFcuAbFsIo5Kzq14IWVRRGN9ydxApYEqFmxsMsc24EuVxgqxxa4J+ej8ro6u/ZUEqfwSUIjcTSh+EMw60Dxye6VBKhoB4j3xBRQjmxWilRYS4ogRVVnU35b5m9MAzkcARbQYWROKHyjNBjyKOv8hOzZALJfoAJY77R/iDip6bksmlXLa35kBFBGViq8/jYh48KAkonc6HQUcGSCeSbXW0aIN35g/41i+de7pTIi6ftVcFMslLnLS0ZEBVPQWJ/0amfkzjqV96QJmTp/MFctO9cIEdzrpZNsALdnESuBsJ8kalZL4EWN0lJ4x9Wj3TaByVkuudYXdbrYNMLZKN8Qih4tfwgsTiGnYnlBq68ahNdf6BdM03qf6l2hXBf9P/EP5YO8+nnz1LxzI591IWTAMc2ZPouefVjvYGgGKpnE5ofiWsCI+uD4SNJmmcamdDrYMIHCFvXoaE6vil3DZBLY0smyAlu7UQuA02+U0GHbFLzFj6tEsPekEN0pYcnE2YfkR3bIBDLjMWT2Ng1PxAba89yGvvP2eK3VEVCzPxLZsABWt100bXKFS8XObt6Mu7R2i8DWrbS1Vu7IzPWV8NP8R/m/FVhNUk/hjFIrjho+xso+hpRFgfPPIuYTiH5EqFB+gKTLSfI6VhpYMoKZh+w1TI1Cl4gPWNbNkgLHtV0MOoZrFBxBRSwYoW326Mx05EM0PAeMqrqpOqHbxxxiekI9OLLewtOwIMDxu+CRC8T+lRsQHGHdw/METyzUqa4BioWmuO/XUPjUkPmBNu7IGENHQANSe+ACGBe1CA1igFsUHEKjcANrgc/5rVXwAhdnl2pR/DBSd4kYxtUgtiw+gopPLtSlvAJVJrlTjkFnTJzPvhON8z1vr4gOIaRxdro2VF0Flg3jFrOmTufzsU+k4cz4LZx7vW956EB8A0bLaWZndE4gBSuKPaxotsX3JPAC2vr/b07x1I/4orowAvl8CDhcfQERoXzLP05GgzsQHlwzgK0cSv4SXJqhD8S1hxQAVrT+3w+eJX8ILE9Sx+GUPpLBiAF9OtbAifgk3TVDH4kOtGOCYSRMsi19CREgtnsf8Gcc6zlvn4oNKbRjg3/sPOrq7jxhC+owFjkaCuhcfUMN0xQCen4+rKH1b3mbjzg9s93VyOWgE8QFEpfI5gQLvulPO5+OXCRpFfACBneXalP8YpLLDlWos4LUJGkl8AIWy2lWVAcA7EzSa+ACmBe3KGsA0zO3ulGMdt03QiOIDNIuW1a7sc9ekfHTngWh+GJ/nBZZMALBk9gxbfUsmADBNsyHFR/RgdKR5V9lmVmLFMslNwOkVF+UAEUicfgqLTvyi7b5Fc1S5hhN/lI19qezSco2sfgtYX2ExjlGF3KYdji4HEUMaVXwQ/b2VZtYWhqgEZgCo7J7ALnUhPtY1s2aASPElwNPjy8rhhwnqRXygIIb5ipWGlgzQk+jZJ7Cxspoqx0sT1JH4qOjrVo+mtzwfwBR9wXlJ7uGFCepJfABDxdL1H+zsEGKYTzkrx33cNEG9iQ9gqnRabWvZAL2tvX8FtjiqyAPcMEE9iq+wob8ts9Vqe3tTwlSetF2Rh1RignoUH8CwqZEtA0ThdwT8NHA4TkxQr+IDBYkU19rpYMsAmbbMbmCdrZJ8wI4J6lh8gOfs7BIKzmYF3++gj+dYMUGdiw8OtHF0yEAsk3yVKt0xXBBii+Z85gNS3Ysv+se+ZM72uY3O1gWI3uuonw8caSSoe/EBUbnbUT9H2RSJZZMbgMWO+vtAaSSIGEbdiw9s6UtmFyPY/i8djgCoqlTtKABjI8EbbzWC+Ajc5UT8sb4OUSSeSb2oFrcjC/GMl/qS2RVODeB8baCghmHeIODKSQchjhhRlWudig8VLg7NJXPbVPSXlcQIcY6o/LySU0PBhdXBEjFXq4X55yGu897wxKEfVxqkYgP0xns/wTRuAOfDUIht1FS5et2F64YqDeTK/gD97d39UqVvCOsRUblvoC3zvBuxXNsgYt/UvbcBr7kVL+TICLz+wb+Oc3RI5JFwzQCDKwYLEdFLgY/cihnyGfYUTWPVxqt/7dqTl6tbxOSSuV1qmN8ETDfjhgBQRPTygfZuVxfrur5HUH+ipweV692O2+go3NSXzA24HdeTY2DeWrt9w5zL5hqCnOdF/EZDVH7Q15b9mSexvQhaIp5JPqDwHS9z1Duq8lh/W+Yar+J7uk3c+Hz0JgXLM1RDPsPaowpNnl5OPR0BYOzImeaRNah45uK6ROU3+6ftuWpwxaCnczA9N0CJlmziVqnyT8jVgqj8tLctc5svufxIUiKeTVynKg9ShTuUVglFVG7oa8s86ldCXw0AEMsm4qg8Dkz3O3eV8xGiV3rxqPd5+G4AgEQ2MasAT4nKsiDyVyF/lkhxVW9r7zt+Jw5kKM4lc7uGpny8HLiLxn5rqIg+8I/dxy8LQnwIaAQ4lFg2cTEqjwBlz7irM941Va5x66ueUwK/GetL5gakqTiP0dFgOOh6vEYgj+gDE/LRhUGLP1ZP9RB7pn0OkeIa4IKga/GIlyRSvH5spXVVUFUGKNHSnWoT0TsIaGcyD9gk8MPeVDYbdCGHU5UGKBHvTp2joncB5wddi0NeQ/TevkSur5KZu15S1QYo0ZJrXSGmcTPwdawddBUkBeB5Ncz7+xM9ge6uZoWaMECJCzvT05ui+UsQvbLa3iEobEP0iYjo43aXaAdJTRngUOI98QUUI6sUVgJn4P/IUAD+pKIvNMHaXDK3zef8rlCzBjiU1lzr0abKV0XlfIXlwELc39t4WOFNVAbFMNdPGGl+uaujy7cDtbyiLgxwOOnOdOSTiPklFfNkET1FROcKzFaVycBERs/Tm8r/zkTcD+wF9qnofgP2ofKOwg5TZUekqbBjyaYl765evbqR31qGhISEhISEhISEhISEhITUOP8FRj8ku0SbqC0AAAAASUVORK5CYII='
    }

    public getFalseIcon(): string {
        return 'data:image/png;base64,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'
    }

}