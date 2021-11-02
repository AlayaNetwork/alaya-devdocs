---
id: Install_Alaya
title: Source Installation Alaya
sidebar_label: Source Installation Alaya
---



This document is intended for users with the ability to compile source code on the Alaya blockchain.

- Alaya supports source code compilation and installation under Windows and Ubuntu. 

## Windows source code compilation

Windows compilation environment requirements :

- git: `2.19.1 and above`
- Go language development kit: `go (1.16+)`
- mingw: `mingw (V8.1.0)`
- cmake: `3.0 +`

You can install the above compilation environment yourself. Please make sure the above environment can run normally before compiling `Alaya` source code.

> You can also use `Chocolatey` to install the compilation environment (if you do not already have `chocolatey`, you can follow the instructions on <https://chocolatey.org> to install), start `PowerShell` as an administrator, and then execute the following command:
>
> Install git:
>
> ```
> choco install git
> ```
>
> Install golang:
>
> ```
> choco install golang
> ```
>
> Install mingw:
>
> ```
> choco install mingw
> ```
>
> Install cmake:
>
> ```
> choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
> ```
>
> Most softwares installed using the `chocolatey` package manager have a default installation path, and some software may have various paths, depending on the publisher of the software. Installing these packages will modify the Path environment variable. The final installation path can be viewed in the PATH. Some machine environments may not find the installation path of these tools in the PATH, and you need to add it manually at this time. After installation, please make sure the installed Go version is 1.11 (or higher).
>

> Note: The following commands need to be run in the `Git-bash` environment. In any directory, right-click and select `Git Bash Here` to bring up the `Git Bash` running window.

- Get the source code

Get the source code and put it in the GOPATH path, where `master` is the branch name, then switch to the actual branch:

```
mkdir -p $GOPATH/src/github.com/AlayaNetwork
cd $GOPATH/src/github.com/Alaya-Go
git clone -b master https://github.com/AlayaNetwork/Alaya-Go.git --recursive
```

- Add bls dependent library to environment variables

```bash
echo 'export PATH=$PATH:"$GOPATH/src/github.com/AlayaNetwork/Alaya-Go/crypto/bls/bls_win/lib"' >> ~/.bashrc
source ~/.bashrc
```

- Compile

```
cd $GOPATH/src/github.com/AlayaNetwork/Alaya-Go
go run build/ci.go install ./cmd/alaya
go run build/ci.go install ./cmd/alayakey
```

After compiling, `alaya`,` alayakey` executable files will be generated in the` Alaya-Go/build/bin` directory. Copy these executable files to your working directory and run.

> Repeated compilation will overwrite the previously generated executable file.

## Ubuntu source code compilation	

**step1.** Ubuntu compilation environment requirements:

- System version: `Ubuntu 18.04.1 and above`
- git: `2.19.1 and above`
- Compilers: `gcc (4.9.2+)`, `g ++ (5.0+)`
- Go language development kit: `go (1.16+)`
- cmake: `3.0 +`

**step2.** Get the Alaya source:

```bash
git clone -b master https://github.com/AlayaNetwork/Alaya-Go.git --recursive
```

**step3.** Install dependency library:

```bash
sudo apt update 
sudo apt install -y golang-go cmake llvm g++ libgmp-dev libssl-dev
```

**step4.** compilation：

```bash
cd Alaya-Go
make all
```

After compiling, a series of executable files such as `alaya, alayakey` and so on will be generated in the `./build/bin` directory. 

**step5.** Copy binary:

```shell
sudo cp -f ./build/bin/alaya /usr/bin/ 
sudo cp -f ./build/bin/alayakey /usr/bin/
```

To this step, congratulations, the source code compilation completed!
