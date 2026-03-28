---
title: PBR着色器原理解析
date: 2026-03-28
description: 深入理解基于物理的渲染(PBR)着色器的工作原理
draft: false
tags:
  - PBR
  - Shader
  - 渲染技术
category: Graphics
---

# PBR着色器原理解析

## 什么是PBR

PBR (Physically Based Rendering) 基于物理的渲染，通过数学模型更真实地模拟光与材质的交互。

## 核心概念

### BRDF (双向反射分布函数)

BRDF描述光线如何从表面反射：

```
BRDF = f(入射方向, 出射方向, 材质属性)
```

### 能量守恒

```
出射光能量 ≤ 入射光能量
```

## 光照模型

### 迪士尼原则BRDF

| 参数 | 说明 |
|------|------|
| Base Color | 基础颜色 |
| Metallic | 金属度 (0-1) |
| Roughness | 粗糙度 (0-1) |
| Specular | 高光强度 |
| Normal | 法线贴图 |

### 简化公式

```glsl
vec3 diffuse = (1.0 - metallic) * baseColor * (1.0 - dielectric);
vec3 specular = lerp(dielectric, baseColor, metallic) * roughness;
```

## PBR Shader实现

### 基础结构

```glsl
struct PBRParams {
    vec3 albedo;      // 基础色
    float metallic;   // 金属度
    float roughness;   // 粗糙度
    vec3 normal;       // 法线
    vec3 viewDir;     // 视线方向
    vec3 lightDir;    // 光源方向
    vec3 lightColor;   // 光源颜色
};
```

### 计算函数

```glsl
float DistributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    
    float num = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = 3.14159 * denom * denom;
    
    return num / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness) {
    float r = roughness + 1.0;
    float k = (r * r) / 8.0;
    float num = NdotV;
    float denom = num * (1.0 - k) + k;
    return num / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = GeometrySchlickGGX(NdotL, roughness);
    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}
```

### 主函数

```glsl
vec3 calculatePBR(PBRParams params) {
    vec3 F0 = mix(vec3(0.04), params.albedo, params.metallic);
    
    // 中间向量
    vec3 N = normalize(params.normal);
    vec3 V = normalize(params.viewDir);
    vec3 L = normalize(params.lightDir);
    vec3 H = normalize(V + L);
    
    // Cook-Torrance BRDF
    float D = DistributionGGX(N, H, params.roughness);
    float G = GeometrySmith(N, V, L, params.roughness);
    vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
    
    vec3 numerator = D * G * F;
    float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);
    vec3 specular = numerator / max(denominator, 0.001);
    
    // 漫反射
    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - params.metallic;
    vec3 diffuse = kD * params.albedo / 3.14159;
    
    // 最终光照
    float NdotL = max(dot(N, L), 0.0);
    return (diffuse + specular) * params.lightColor * NdotL;
}
```

## 实用技巧

### 粗糙度贴图

```glsl
// 从纹理采样
float roughness = texture(roughnessMap, uv).r;
roughness = roughness * roughness; // gamma校正
```

### 环境反射

```glsl
vec3 R = reflect(-V, N);
vec3 envColor = texture(envMap, R).rgb;
vec3 F = fresnelSchlick(max(dot(N, V), 0.0), F0);
vec3 envReflection = envColor * F;
```

## 总结

PBR优势：
1. 视觉效果更真实
2. 光照参数更直观
3. 环境适应性更强

掌握PBR需要理解数学原理，但实现起来有规律可循。
