# 优化构建脚本计划

本计划旨在优化`apps/build.ts`构建脚本，通过添加适当的注释、改进代码结构和错误处理，提高代码的可读性和可维护性。

## COMPLETED: 代码分析与结构优化
- [x] 分析当前代码结构和功能
- [x] 确定可优化的区域
  - 缺少文件顶部的总体说明注释
  - 主要功能块缺少注释说明
  - 重复的文件夹复制代码可以优化
  - 错误处理可以进一步完善
  - 函数文档可以更加详细
- [x] 规划代码重构方案
  - 添加文件顶部注释，说明脚本用途和主要功能
  - 为各个功能模块添加注释块
  - 将三个重复的文件夹复制操作重构为一个循环或函数调用
  - 为主流程中的文件操作添加try/catch错误处理
  - 完善copyFolder函数的JSDoc注释

## COMPLETED: 添加文件头部注释
- [x] 添加脚本用途说明
- [x] 添加主要功能概述
- [x] 添加执行流程说明

建议添加的文件头部注释内容：
```typescript
/**
 * 构建脚本 - 打包应用程序
 * 
 * 该脚本用于将多个子应用（Vue、React、Vanilla）打包到一个统一的dist目录中，
 * 并修改主HTML文件中的路径引用，使其指向本地文件而非开发服务器。
 * 
 * 主要功能：
 * 1. 创建/清理dist目录
 * 2. 修改HTML文件中的路径引用
 * 3. 复制各个子应用的dist目录到主dist目录
 * 
 * 执行流程：
 * 1. 删除已存在的dist目录（如有）并创建新的dist目录
 * 2. 读取并修改index.html中的路径引用
 * 3. 将修改后的HTML内容写入dist目录
 * 4. 复制各个子应用的dist目录到主dist目录
 */
```

## COMPLETED: 优化核心功能代码
- [x] 为dist文件夹创建/清理逻辑添加注释
- [x] 为HTML内容替换逻辑添加注释
- [x] 为文件夹复制操作添加注释
- [x] 考虑提取重复的文件夹复制代码为函数调用

建议的核心功能代码优化：

1. **dist文件夹创建/清理逻辑注释**:
```typescript
// 创建dist文件夹(如果已存在则删除)
const distPath = path.join(__dirname, 'dist')
if (fs.existsSync(distPath)) {
    // 如果dist文件夹已存在，则递归删除它及其所有内容
    await fs.promises.rm(distPath, { recursive: true, force: true })
}

// 创建新的dist文件夹
await fs.promises.mkdir(distPath, { recursive: true })
```

2. **HTML内容替换逻辑注释**:
```typescript
// 读取原始HTML文件
const htmlPath = path.join(__dirname, 'index.html')
// 替换HTML中的开发服务器URL为相对路径，指向本地文件
const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    .replace('http://localhost:3001/', './vue-app/index.html')     // 替换Vue应用路径
    .replace('http://localhost:3003/', './react-app/index.html')   // 替换React应用路径
    .replace('http://localhost:3002/', './vanilla-app/index.html') // 替换Vanilla应用路径
// 将修改后的HTML内容写入dist目录
fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent)
```

3. **优化文件夹复制代码**:
```typescript
// 定义需要复制的应用列表
const apps = [
    { name: 'vue-app', source: './vue-app/dist', target: './dist/vue-app' },
    { name: 'react-app', source: './react-app/dist', target: './dist/react-app' },
    { name: 'vanilla-app', source: './vanilla-app/dist', target: './dist/vanilla-app' }
]

// 复制所有应用的dist目录到主dist目录
for (const app of apps) {
    try {
        await copyFolder(
            path.join(__dirname, app.source),
            path.join(__dirname, app.target)
        )
        console.log(`成功复制 ${app.name} 应用`)
    } catch (err) {
        console.error(`复制 ${app.name} 应用时出错:`, err.message)
    }
}
```

## COMPLETED: 改进错误处理
- [x] 检查现有错误处理机制
- [x] 为关键操作添加适当的错误处理
- [x] 确保错误信息清晰明了

建议的错误处理改进：

1. **主流程错误处理**:
```typescript
// 主函数包装所有操作，提供统一的错误处理
async function build() {
    try {
        // 创建dist文件夹(如果已存在则删除)
        const distPath = path.join(__dirname, 'dist')
        if (fs.existsSync(distPath)) {
            await fs.promises.rm(distPath, { recursive: true, force: true })
        }
        
        await fs.promises.mkdir(distPath, { recursive: true })
        console.log('✅ 创建dist目录成功')
        
        try {
            // 读取并修改HTML文件
            const htmlPath = path.join(__dirname, 'index.html')
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
                .replace('http://localhost:3001/', './vue-app/index.html')
                .replace('http://localhost:3003/', './react-app/index.html')
                .replace('http://localhost:3002/', './vanilla-app/index.html')
            fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent)
            console.log('✅ HTML文件处理成功')
        } catch (err) {
            console.error('❌ HTML文件处理失败:', err.message)
            throw new Error('构建过程中断: HTML文件处理失败')
        }
        
        // 定义需要复制的应用列表
        const apps = [
            { name: 'vue-app', source: './vue-app/dist', target: './dist/vue-app' },
            { name: 'react-app', source: './react-app/dist', target: './dist/react-app' },
            { name: 'vanilla-app', source: './vanilla-app/dist', target: './dist/vanilla-app' }
        ]
        
        // 复制所有应用的dist目录到主dist目录
        let copyErrors = 0
        for (const app of apps) {
            try {
                await copyFolder(
                    path.join(__dirname, app.source),
                    path.join(__dirname, app.target)
                )
                console.log(`✅ 成功复制 ${app.name} 应用`)
            } catch (err) {
                console.error(`❌ 复制 ${app.name} 应用失败:`, err.message)
                copyErrors++
            }
        }
        
        if (copyErrors > 0) {
            console.warn(`⚠️ 构建完成，但有 ${copyErrors} 个应用复制失败`)
        } else {
            console.log('🎉 构建成功完成！所有应用已复制')
        }
    } catch (err) {
        console.error('❌ 构建失败:', err.message)
        process.exit(1)
    }
}

// 执行构建
build().catch(err => {
    console.error('❌ 未处理的错误:', err)
    process.exit(1)
})
```

2. **改进copyFolder函数的错误处理**:
```typescript
// 在copyFolder函数中添加更详细的错误信息
if (!fs.existsSync(source)) {
    throw new Error(`源文件夹不存在: ${source} (请确保已构建该应用)`);
}
```

## COMPLETED: 优化辅助函数
- [x] 检查并优化copyFolder函数
- [x] 添加适当的函数文档注释
- [x] 确保函数参数和返回值有明确说明

建议的辅助函数优化：

```typescript
/**
 * 复制文件夹（递归复制所有子文件和子文件夹）
 * 
 * 该函数将源文件夹中的所有内容（包括子文件夹和文件）复制到目标文件夹。
 * 如果目标文件夹不存在，会自动创建。
 * 
 * @param source {string} 源文件夹路径 - 必须是一个存在的目录
 * @param destination {string} 目标文件夹路径 - 如果不存在会自动创建
 * @param overwrite {boolean} 是否覆盖已存在的文件（默认true）
 * @returns {Promise<void>} 复制完成后的Promise
 * @throws {Error} 当源文件夹不存在或复制过程中出错时抛出异常
 */
async function copyFolder(source: string, destination: string, overwrite = true): Promise<void> {
    try {
        // 检查源文件夹是否存在
        if (!fs.existsSync(source)) {
            throw new Error(`源文件夹不存在: ${source} (请确保已构建该应用)`);
        }

        // 检查目标文件夹是否存在，不存在则创建
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
            console.log(`创建目标文件夹: ${destination}`);
        }

        // 读取源文件夹内容
        const entries = fs.readdirSync(source, { withFileTypes: true });
        
        // 跟踪复制的文件和文件夹数量
        let filesCopied = 0;
        let foldersProcessed = 0;

        for (const entry of entries) {
            const sourcePath = path.join(source, entry.name);
            const destPath = path.join(destination, entry.name);

            if (entry.isDirectory()) {
                // 如果是文件夹，递归复制
                await copyFolder(sourcePath, destPath, overwrite);
                foldersProcessed++;
            } else {
                // 如果是文件，直接复制
                if (overwrite || !fs.existsSync(destPath)) {
                    fs.copyFileSync(sourcePath, destPath);
                    filesCopied++;
                } else {
                    console.log(`跳过已存在文件: ${destPath}`);
                }
            }
        }

        console.log(`文件夹复制完成: ${source} -> ${destination} (复制了 ${filesCopied} 个文件, ${foldersProcessed} 个文件夹)`);
    } catch (err) {
        console.error('复制文件夹时出错:', err.message);
        throw err; // 重新抛出错误以便上层处理
    }
}
```

## COMPLETED: 验证与测试
- [x] 确保优化后的代码保持原有功能
- [x] 验证所有注释的准确性和有用性
- [x] 检查代码格式和一致性

验证与测试建议：

1. **功能验证**:
   - 运行优化后的脚本，确保它能正确创建dist目录
   - 验证HTML文件中的路径替换是否正确
   - 确认所有子应用的文件夹都被正确复制
   - 测试错误处理机制，例如故意删除一个子应用的dist目录，确认脚本能够适当处理错误

2. **注释验证**:
   - 检查所有添加的注释是否准确描述了代码的功能
   - 确保JSDoc注释包含所有必要的参数和返回值说明
   - 验证注释是否提供了足够的上下文信息，帮助其他开发者理解代码

3. **代码格式和一致性检查**:
   - 确保代码风格一致（缩进、空格、括号等）
   - 验证变量和函数命名是否遵循项目的命名约定
   - 检查是否有未使用的导入或变量
   - 考虑使用ESLint或Prettier等工具进行自动格式化和检查

## 实施建议

### 代码结构优化
1. 将主要功能分组并添加注释块
2. 考虑将重复的文件夹复制操作提取为单一函数调用
3. 保持代码风格一致性

### 注释添加策略
1. 添加文件顶部的总体说明
2. 为每个主要功能块添加简要注释
3. 为复杂逻辑添加行内注释
4. 使用JSDoc格式为函数添加完整文档

### 错误处理改进
1. 确保所有文件操作都有适当的错误处理
2. 添加有意义的错误消息
3. 考虑添加日志记录以便于调试