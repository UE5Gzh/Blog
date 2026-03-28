---
title: UE5 Mass框架实战：从入门到精通
date: 2026-03-28
description: 深入实践UE5 Mass集群框架，学习如何在实际项目中应用ECS架构
draft: false
tags:
  - Mass
category: Unreal Engine
---

# UE5 Mass框架实战：从入门到精通

## 前言

本文通过实际案例，深入讲解Mass框架的使用方法和最佳实践。

## 项目背景

假设我们需要构建一个RTS游戏，需要同时控制10000个单位。

## 实现步骤

### 1. 定义Fragment

```cpp
// 单位位置
USTRUCT()
struct FRTSMovementFragment : public FMassFragment
{
    UPROPERTY()
    FVector TargetLocation;
    
    UPROPERTY()
    float MoveSpeed = 300.0f;
};

// 单位攻击
USTRUCT()
struct FRTSAttackFragment : public FMassFragment
{
    UPROPERTY()
    float AttackRange = 150.0f;
    
    UPROPERTY()
    float AttackCooldown = 1.0f;
    
    UPROPERTY()
    float CurrentCooldown = 0.0f;
};
```

### 2. 创建Tag

```cpp
USTRUCT()
struct FSelectedTag : public FMassTag { };      // 选中状态
USTRUCT()
struct FEnemyTag : public FMassTag { };        // 敌方单位
USTRUCT()
struct FAllyTag : public FMassTag { };        // 友方单位
USTRUCT()
struct FMovingTag : public FMassTag { };       // 移动中
```

### 3. 实现MovementSystem

```cpp
USTRUCT()
struct FRTSMovementProcessor : public FMassTagGameBlocableSystem
{
    GENERATED_BODY()
    
public:
    void ConfigureQueries() override
    {
        MovementQuery.AddRequirement<FRTSMovementFragment>(
            EMassFragmentAccess::ReadWrite);
        MovementQuery.AddRequirement<FTransformFragment>(
            EMassFragmentAccess::ReadWrite);
        MovementQuery.AddTagRequirement<FMovingTag>(
            EMassFragmentPresence::All);
    }
    
    void Execute(
        FMassEntityManager& EntityManager,
        FMassExecutionPropertyMapper& PropertyMapper,
        FMassGlobalPropertyMapper& GlobalMapper) override
    {
        MovementQuery.ForEachEntityChunk(EntityManager, 
            PropertyMapper, GlobalMapper,
            [](FRTSMovementFragment& Movement, 
               FTransformFragment& Transform)
            {
                // 计算方向
                FVector Direction = 
                    (Movement.TargetLocation - Transform.Position).GetSafeNormal();
                
                // 移动
                Transform.Position += 
                    Direction * Movement.MoveSpeed * DeltaTime;
            });
    }
    
private:
    FMassEntityQuery MovementQuery;
};
```

### 4. 实现AttackSystem

```cpp
USTRUCT()
struct FRTSAttackProcessor : public FMassTagGameBlocableSystem
{
    GENERATED_BODY()
    
public:
    void ConfigureQueries() override
    {
        AttackQuery.AddRequirement<FRTSAttackFragment>(
            EMassFragmentAccess::ReadWrite);
        AttackQuery.AddTagRequirement<FEnemyTag>(
            EMassFragmentPresence::All);
        AttackQuery.AddTagRequirement<FMovingTag>(
            EMassFragmentPresence::None);
    }
    
    void Execute(...) override
    {
        AttackQuery.ForEachEntityChunk(...
            [](FRTSAttackFragment& Attack)
            {
                if (Attack.CurrentCooldown <= 0.0f)
                {
                    // 执行攻击
                    Attack.CurrentCooldown = Attack.AttackCooldown;
                }
                else
                {
                    Attack.CurrentCooldown -= DeltaTime;
                }
            });
    }
    
private:
    FMassEntityQuery AttackQuery;
};
```

### 5. 批量创建单位

```cpp
void ARTSGameMode::SpawnEnemies(int32 Count)
{
    FMassEntityManager& Manager = GetWorld()->GetSubsystem<UMassEntitySubsystem>()->GetEntityManager();
    
    // 创建模板
    FMassEntityTemplate Template;
    Template.AddFragment<FTransformFragment>();
    Template.AddFragment<FRTSMovementFragment>();
    Template.AddFragment<FRTSAttackFragment>();
    Template.AddTag<FEnemyTag>();
    Template.AddTag<FMovingTag>();
    
    // 批量生成
    TArray<FMassEntityHandle> Entities;
    Manager.CreateEntities(Template, Count, Entities);
    
    // 初始化位置（圆形分布）
    for (int32 i = 0; i < Count; ++i)
    {
        float Angle = (float)i / Count * 2.0f * PI;
        float Radius = 1000.0f;
        
        FVector Position(Radius * FMath::Cos(Angle), 
                        Radius * FMath::Sin(Angle), 
                        0.0f);
        
        FTransformFragment* Transform = 
            Manager.GetFragmentData<FTransformFragment>(Entities[i]);
        Transform->Position = Position;
    }
}
```

## 性能对比

| 方案 | 10000单位帧时间 |
|------|-----------------|
| AActor Ticking | ~16ms |
| Mass Framework | <1ms |

## 调试工具

```cpp
// 开启Mass统计
wp.Runtime.ShowStats 1

// 可视化调试
CVarMassDrawEntities = 1;
```

## 总结

Mass框架让处理大量相似实体变得简单高效，掌握ECS思维是关键。
